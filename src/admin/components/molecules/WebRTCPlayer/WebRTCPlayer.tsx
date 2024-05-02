import { useRef } from 'react'

import ReactPlayer from 'react-player'

import company_name from '@admin/assets/images/company_name.jpg'
import { useWebRTC } from '@admin/components/hooks/useWebRTC'

export const WebRTCPlayer = ({ root, offerer }: { root: string | undefined; offerer: string | undefined }) => {
  const playerRef = useRef<ReactPlayer>(null)
  const { status, error, mediaStream } = useWebRTC(root, offerer)

  return (
    <div className="relative rounded-[2rem]" style={{ paddingTop: `${(720 / 1280) * 100}%` }}>
      <ReactPlayer
        id="webrtc-video"
        ref={playerRef}
        muted={true}
        playing={true}
        style={{ position: 'absolute', top: '0', left: '0', zIndex: 11 }}
        width={'100%'}
        height={'100%'}
        url={mediaStream}
        config={{
          file: {
            attributes: { poster: company_name }
          }
        }}
      />
      <div className="absolute top-0 inset-x-0 border-2 rounded-[2rem] h-full w-full">
        {mediaStream ? null : <span className="absolute top-1/2 inset-x-0 text-center z-[11]">{status}</span>}
        {error ? <span className="absolute top-1/2 inset-x-0 text-center z-[11] text-red">{error.message}</span> : null}
      </div>
    </div>
  )
}
