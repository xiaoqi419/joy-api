import { createFromIconfontCN } from '@ant-design/icons'

// @ts-ignore
const JoyIcon = ({ type }) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4443840_xl2yiy0b5p.js'
  })
  return (
    <IconFont
      type={type}
      style={{
        display: 'block',
        width: 50,
        height: 50,
        fontSize: 50
      }}
    />
  )
}

export default JoyIcon
