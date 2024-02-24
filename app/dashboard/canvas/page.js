"use client";
import { Tldraw } from '@tldraw/tldraw'

export default function page() {


  return (
    <div style={{ position: 'fixed', inset: 0 }}>
		<Tldraw  />
	</div>
  )
}
