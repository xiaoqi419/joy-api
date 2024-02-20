import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-components'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright={2024 + '\n' + 'Powered by JASON'}
      style={{
        background: 'none'
      }}
      links={[
        {
          key: 'JASON的小屋',
          title: '爱能克服远距离',
          href: 'https://www.ojason.top',
          blankTarget: true
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> Github
            </>
          ),
          href: 'https://github.com/xiaoqi419',
          blankTarget: true
        }
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]}
    />
  )
}

export default Footer
