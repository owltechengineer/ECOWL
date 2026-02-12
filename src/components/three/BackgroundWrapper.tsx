'use client';

import { useState, useEffect } from 'react';

export default function BackgroundWrapper() {
  const [Scene, setScene] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import('@/components/three/BackgroundScene').then((mod) => {
      setScene(() => mod.default);
    });
  }, []);

  // Render a stable empty div on server, populated on client after mount
  // This avoids hydration mismatch caused by ssr:false dynamic imports
  return <>{Scene ? <Scene /> : null}</>;
}
