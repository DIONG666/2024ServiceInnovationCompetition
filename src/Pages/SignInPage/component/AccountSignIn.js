// 登陆界面：通过账号密码登录

import { Button, Form, Input, Message } from '@arco-design/web-react';
import {IconSafe, IconUnlock, IconUser} from '@arco-design/web-react/icon';
import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {checkAccount} from "../interaction";

const FormItem = Form.Item;

const AccountSignIn = () => {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate=useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formRef = useRef();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // @ts-expect-error
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  return (
    <>
      <Form autoComplete="off" ref={formRef}>
        <FormItem field="用户名/邮箱" rules={[{ required: true }]}>
          <Input
              onChange={value=>{setName(value)}}
            placeholder="请输入用户名/邮箱"
            prefix={<IconUser />}
            style={{
              height: '50px',
              width: '125%',
            }}
          />
        </FormItem>

        <FormItem field="密码" rules={[{ required: true }]}>
          <Input
              onChange={value=>{setPassword(value)}}
            placeholder="请输入密码"
            prefix={<IconUnlock />}
            style={{
              height: '50px',
              width: '125%',
            }}
          />
        </FormItem>

        <FormItem field="验证码" rules={[{ required: true }]}>
          <Input
              placeholder="请输入验证码"
              prefix={<IconSafe />}
              style={{
                height: '50px',
                width: '125%',
              }}
          />
        </FormItem>
          <br />
        <FormItem>
          <Button
            type="primary"
            style={{
              fontSize: '20px',
              height: '50px',
              width: '125%',
              borderRadius: '5px',
            }}
            onClick={async () => {
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                  checkAccount(name,password)
                  Message.info('校验通过，提交成功！');
                  navigate('/main/home')
                } catch (_) {
                  console.log(formRef.current.getFieldsError());
                  Message.error('仍有未填写字段！');
                }
              }
            }}
          >
            登 录
          </Button>
        </FormItem>
      </Form>

      <div className="accountWrapper">
        <div className="box">
          <a href="about:blank" style={{ textDecoration: 'none' }}>
            <div className="item1">忘记密码</div>
          </a>
        </div>
        <div className="box">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="item2">注册账号</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccountSignIn;
