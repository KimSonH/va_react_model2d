declare type Key = React.Key

export interface TabComponent {
  data: {
    key?: Key
    className?: string
    title?: React.ReactNode
    render?: () => React.ReactNode
  }[]
}
