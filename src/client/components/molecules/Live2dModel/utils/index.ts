/* eslint-disable @typescript-eslint/no-use-before-define */
export const ListMouthAction = [
  {
    label: 'AEI',
    value: 0.5
  },
  {
    label: 'O',
    value: 1
  },
  {
    label: 'CDGKNSTXYZ',
    value: 0.6
  },
  {
    label: 'QW',
    value: 0.9
  },
  {
    label: 'L',
    value: 0.7
  },
  {
    label: 'BMP',
    value: 0.1
  },
  {
    label: 'FV',
    value: 0.2
  },
  {
    label: 'E',
    value: 0.3
  },
  {
    label: 'HJR',
    value: 0.4
  },
  {
    label: 'U',
    value: 0.8
  }
]

const expressionGroups: Record<string, string[]> = {
  happy: ['happy', 'fun', 'smile'],
  sad: ['sad', 'unhappy', 'tear'],
  angry: ['angry', 'mad', 'rage'],
  surprised: ['surprised', 'shocked', 'astonished']
  // 'Confused', 'Excited', 'Fearful', 'Calm'
}

export interface ExpressionInfo {
  expression: string
  expressionGroup: string
  positions: number[]
}

export function checkMessageForExpressions(message: string): ExpressionInfo[] | null {
  const lowerCaseMessage = message.toLowerCase()
  const foundExpressions: ExpressionInfo[] = []

  for (const [expressionGroup, words] of Object.entries(expressionGroups)) {
    for (const word of words) {
      const lowerCaseWord = word.toLowerCase()
      let wordIndex = lowerCaseMessage.indexOf(lowerCaseWord)

      while (wordIndex !== -1) {
        const prevChar = lowerCaseMessage[wordIndex - 1]
        const nextChar = lowerCaseMessage[wordIndex + lowerCaseWord.length]

        if ((prevChar === undefined || !isLetter(prevChar)) && (nextChar === undefined || !isLetter(nextChar))) {
          const expressionInfo = foundExpressions.find((info) => info.expressionGroup === expressionGroup)

          if (expressionInfo) {
            expressionInfo.positions.push(wordIndex)
          } else {
            foundExpressions.push({ expression: word, expressionGroup, positions: [wordIndex] })
          }
        }

        wordIndex = lowerCaseMessage.indexOf(lowerCaseWord, wordIndex + 1)
      }
    }
  }

  return foundExpressions.length > 0 ? foundExpressions : null
}

function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char)
}
