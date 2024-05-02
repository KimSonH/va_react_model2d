import { useEffect, useState } from 'react'

import { useContextHook } from '@client/components/hooks/useContextHook'
import * as LAppDefine from '@client/components/molecules/Live2dModel/lappdefine'
import { LAppDelegate } from '@client/components/molecules/Live2dModel/lappdelegate'

export const ModelAssistant = () => {
  const [value, setValue] = useState('')

  const { messageVoice } = useContextHook()

  const [valueExpression, setValueExpression] = useState(0)

  useEffect(() => {
    if (LAppDelegate.getInstance().initialize() === false) {
      return
    }

    LAppDelegate.getInstance().run()
    window.addEventListener('beforeunload', () => LAppDelegate.releaseInstance(), { passive: true })

    window.addEventListener(
      'resize',
      () => {
        if (LAppDefine.CanvasSize === 'auto') {
          LAppDelegate.getInstance().onResize()
        }
      },
      { passive: true }
    )

    // Clean up event listeners if necessary when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', () => LAppDelegate.releaseInstance())
      window.removeEventListener('resize', () => {
        if (LAppDefine.CanvasSize === 'auto') {
          LAppDelegate.getInstance().onResize()
        }
      })
    }
  }, [])

  useEffect(() => {
    setValue(messageVoice)
  }, [messageVoice])

  return (
    <>
      <div
        id="model-hiyori"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%'
          // height: '90%'
        }}
      ></div>

      <div className="flex flex-col gap-2 w-full px-4">
        <input className="text-black hidden" id="chat-box" value={value} placeholder="random message" readOnly />

        <input className="text-black hidden" id="total-time-read" value={valueExpression} readOnly />
        <button
          className="text-base bg-indigo-300 rounded-lg p-2 hidden"
          onClick={async () => {
            if (value) setValue('')
            else
              setValue(
                'yakyuu hoshoukin koushin motsu teru hoiiru kyouryoku senryakuteki.   kuuru gyakutai jiku shimei anata jishin deddo.   kakusu renzoku kyabin semai rogu fugou denchi souchi.'
              )
          }}
        >
          {value ? 'Clear message' : 'Random Message'}
        </button>

        <button
          className="text-base bg-indigo-300 rounded-lg p-2 mb-2 hidden"
          onClick={async () => {
            const min = 1000
            const max = 360000

            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            setValueExpression(randomNum)
          }}
        >
          Random Time audio
        </button>
      </div>
    </>
  )
}
