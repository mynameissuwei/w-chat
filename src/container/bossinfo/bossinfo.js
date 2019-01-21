import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)

class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      'title': '',
      'company': '',
      'money': '',
      'desc': '',
      'avatar': ''
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(key, val){
    this.setState({
      [key]: val
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return(
      <div>
        {/* 前往路径存在 并且 前往路径和当前路径不同，则前往 */}
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(val) => this.onChange('title', val)}>招聘职位</InputItem>
        <InputItem onChange={(val) => this.onChange('company', val)}>公司名称</InputItem>
        <InputItem onChange={(val) => this.onChange('money', val)}>职位薪资</InputItem>
        <TextareaItem rows={3} autoHeight title="职位要求" onChange={(val) => this.onChange('desc', val)}></TextareaItem>
        <WhiteSpace />
        <Button type='primary' onClick={() => {this.props.update(this.state)}}>保存</Button>
      </div>
    )
  }
}

export default BossInfo