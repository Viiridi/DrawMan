import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Background() {
  const mountRef = useRef(null);
  let scene, camera, renderer;
  let blobs = [];

  useEffect(() => {
    // Create scene
    scene = new THREE.Scene();
  
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
  
    // Determine time of day
    const currentTime = new Date().getHours();
    let backgroundColor, blobColor;
    if (currentTime >= 6 && currentTime < 18) {
      // Daytime
      backgroundColor = 0x87ceeb; // Sky blue
      blobColor = 0x00bfff; // Bright blue for blobs
    } else {
      // Evening
      backgroundColor = 0xffa500; // Orange
      blobColor = 0xffcc00; // Yellow for blobs
    }
  
    // Set background color
    scene.background = new THREE.Color(backgroundColor);
  
    // Create blobs
    const createBlob = () => {
      const geometry = new THREE.SphereGeometry(1, 32, 32); // Larger blob size
      const material = new THREE.MeshBasicMaterial({ color: blobColor });
      const blob = new THREE.Mesh(geometry, material);
    
      let positionValid = false;
      while (!positionValid) {
        const position = new THREE.Vector3(Math.random() * 8 - 4, Math.random() * 8 - 4, 0); // Set z-position to 0
        let valid = true;
        for (const existingBlob of blobs) {
          const distance = position.distanceTo(existingBlob.position);
          const minDistance = blob.geometry.parameters.radius + existingBlob.geometry.parameters.radius;
          if (distance < minDistance) {
            valid = false;
            break;
          }
        }
        if (valid) {
          blob.position.copy(position);
          positionValid = true;
        }
      }
    
      blob.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, 0); // Reduced initial velocity
      blobs.push(blob);
      scene.add(blob);
    };
  
    for (let i = 0; i < 5; i++) { // Reduced blob quantity
      createBlob();
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update blob positions
      blobs.forEach(blob => {
        blob.position.add(blob.velocity);
      
        // Bounce off boundaries
        if (blob.position.x < -3 || blob.position.x > 3) {
          blob.velocity.x *= -1;
        }
        if (blob.position.y < -3 || blob.position.y > 3) {
          blob.velocity.y *= -1;
        }
      });

      // Check collisions between blobs
      for (let i = 0; i < blobs.length; i++) {
        const blob1 = blobs[i];
        for (let j = i + 1; j < blobs.length; j++) {
          const blob2 = blobs[j];
          const distance = blob1.position.distanceTo(blob2.position);
          const minDistance = blob1.geometry.parameters.radius + blob2.geometry.parameters.radius;
      
          if (distance < minDistance) {
            // Move blobs apart
            blob1.position.add(blob1.velocity.clone().multiplyScalar(0.1));
            blob2.position.add(blob2.velocity.clone().multiplyScalar(0.1));
      
            // Smoothly adjust velocities
            const collisionNormal = blob1.position.clone().sub(blob2.position).normalize();
            const relativeVelocity = blob2.velocity.clone().sub(blob1.velocity);
            const velocityChange = collisionNormal.multiplyScalar(relativeVelocity.dot(collisionNormal));
            blob1.velocity.add(velocityChange);
            blob2.velocity.sub(velocityChange);
          }
        }
      }
  
      renderer.render(scene, camera);
    };
    animate();
  
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
  
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
}

export default Background;
