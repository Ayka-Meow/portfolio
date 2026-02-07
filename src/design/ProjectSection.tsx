import { motion } from "framer-motion";

const ProjectSection = () => {

    return (
        <div>
{/* TWEEN Animation (duration + easing) */}
<motion.div
  animate={{ x: 100, opacity: 1 }}
  transition={{ 
    duration: 2, 
    type: "tween",
    ease: "easeInOut" // or "linear", "easeIn", "easeOut", [0.17, 0.67, 0.83, 0.67]
  }}
/>

// SPRING Animation - Physics-based (default)
<motion.div
  animate={{ scale: 1.5 }}
  transition={{ 
    type: "spring",
    stiffness: 100,  // Higher = faster/snappier
    damping: 10,     // Higher = less oscillation
    mass: 1          // Higher = slower/heavier
  }}
/>

// SPRING Animation - Duration-based
<motion.div
  animate={{ y: 50 }}
  transition={{ 
    type: "spring",
    duration: 0.8,
    bounce: 0.25  // 0 = no bounce, 1 = very bouncy
  }}
/>

{/* // INERTIA Animation (velocity-based) */}
<motion.div
  drag="x"
  dragTransition={{ 
    type: "inertia",
    power: 0.8,        // Higher = goes further
    timeConstant: 700, // Duration of deceleration
    modifyTarget: (target) => Math.round(target / 100) * 100 // Snap to grid
  }}
/>

{/* // SVG Path Animation (your example) */}
<motion.path
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, type: "tween" }}
/>

{/* // Complex example with multiple properties */}
<motion.div
  animate={{ 
    x: 100, 
    rotate: 360,
    backgroundColor: "#ff0000"
  }}
  transition={{
    x: { type: "spring", stiffness: 50 },
    rotate: { duration: 2, type: "tween", ease: "linear" },
    backgroundColor: { duration: 1 }
  }}
/>
        </div>
    )
}

export default ProjectSection;