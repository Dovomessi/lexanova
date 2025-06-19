
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function CounterAnimation({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '' 
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentCount = Math.floor(startValue + (end - startValue) * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}
