'use client'
import { Suspense } from 'react'
import Chatpage from './ChatpageClient'
import Loading from '@/componets/Loading'

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="loading-overlay">
          <Loading />
        </div>
      }
    >
      <Chatpage />
    </Suspense>
  )
}
