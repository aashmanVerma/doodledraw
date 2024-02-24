"use client";
import { useUser } from '@clerk/nextjs';
import { Tldraw } from '@tldraw/tldraw'

export default function page() {

  const user = useUser();

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
		<Tldraw persistenceKey={`${user?.user?.id}`}  />
	</div>
  )
}
