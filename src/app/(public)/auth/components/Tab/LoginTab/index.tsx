'use client'

import { BiRightArrowAlt, FcGoogle, FiEye, FiEyeOff } from '@/components/Icons';
import * as Tabs from '@radix-ui/react-tabs';
import { useCallback, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ForgotPasswordDialog } from '../../ForgotPasswordDialog';
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Divider } from '@/components/Divider';

type LoginFormProps = {
  email: string
  password: string
}

const LoginTab = () => {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um E-mail válido.'),
    password: Yup.string().required('Senha obrigatória')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormProps>({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback((data: LoginFormProps) => {
    console.log('submit', data)
    router.push('/')
  }, [])

  return (
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none mt-2"
      value="tab1"
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-4'>
          <fieldset className="mx-auto w-full flex flex-col justify-start">
            <label className="text-[14px] leading-none mb-2.5 text-violet12 block" htmlFor='Email'>
              Email
            </label>
            <div className="flex grow shrink-0 rounded-lg px-3 text-[14px] leading-none shadow-[0_0_0_1px] shadow-[--border] h-11 focus:shadow-[0_0_0_2px] focus:shadow-[--border] outline-none">
              <input
                {...register('email', { required: true })} name='email' placeholder='Email' type='email'
                className="w-full bg-transparent text-[--text] focus:outline-none"
              />
            </div>
          </fieldset>
          {!!errors.email && (
            <span className='mt-2 text-[12px] text-rose-600'>{errors.email.message}</span>
          )}
        </div>

        <div className='mb-4'>
          <fieldset className="mx-auto w-full flex flex-col justify-start">
            <label className="text-[14px] leading-none mb-2.5 text-violet12 block" htmlFor='Senha'>
              Senha
            </label>
            <div className="flex grow shrink-0 rounded-lg px-3 text-[14px] leading-none shadow-[0_0_0_1px] shadow-[--border] h-11 focus:shadow-[0_0_0_2px] focus:shadow-[--border] outline-none">
              <input
                {...register('password', { required: true })}
                type={isShowPassword ? 'text' : 'password'}
                placeholder='Senha'
                className="w-full bg-transparent text-[--text] focus:outline-none"
              />
              <button type='button'
                onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ?
                  <FiEyeOff size={20} color='var(--primary)' style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
                  : <FiEye size={20} color='var(--primary)' style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />}
              </button>
            </div>
          </fieldset>
          {!!errors.password && (
            <span className='m-0 text-[12px] text-rose-600'>{errors.password.message}</span>
          )}
        </div>

        <a className="flex justify-end outline-none font-normal text-[13px]">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <span className='cursor-pointer'>Esqueci minha senha</span>
            </Dialog.Trigger>
            <ForgotPasswordDialog />
          </Dialog.Root>
        </a>


        <button type='submit' className="outline-none font-normal text-[13px] flex w-full mt-8 items-center justify-between h-12 bg-[--primary] rounded-md px-6 cursor-pointer text-white hover:text-zinc-100">
          Acessar Plataforma
          <BiRightArrowAlt size={24} />
        </button>
      </form>

      <Divider />

      <div className="flex w-full mt-8 items-center gap-2 justify-center h-12 bg-zinc-100 rounded-md  px-6 cursor-pointer hover:bg-[--background]">
        <FcGoogle size={24} />
        <button type='button' className="outline-none font-normal text-[14px]">
          Continue com Google
        </button>
      </div>

    </Tabs.Content>
  )
}

export { LoginTab }