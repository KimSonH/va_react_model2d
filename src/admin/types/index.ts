export type AlertType = {
  show: boolean
  type: 'error' | 'success' | 'warning' | 'info'
  text: string
}

export const AlertInitialValue: AlertType = {
  show: false,
  type: 'success',
  text: ''
}

export const chartBackgroundColors = [
  '#4f81bc',
  '#c0504e',
  '#9bbb58',
  '#23bfaa',
  '#795f99',
  '#46a3bb',
  '#ea8e43',
  '#8d5531',
  '#70982f',
  '#ffcb06'
]
