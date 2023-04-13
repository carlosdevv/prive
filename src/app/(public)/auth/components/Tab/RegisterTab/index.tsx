'use client'

import { BsCheck, FiEye, FiEyeOff } from '@/components/Icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

type RegisterFormProps = {
  email: string
  password: string
  confirmPassword: string
}

const RegisterTab = () => {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isCheckedTerms, setIsCheckedTerms] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um E-mail válido.'),
    password: Yup.string().required('Senha obrigatória'),
    confirmPassword: Yup.string()
      .required('Confirmação de senha obrigatória')
      .oneOf([Yup.ref('password')], 'Senhas precisam de iguais para continuar')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback((data: RegisterFormProps) => {
    console.log('submit', data)
    if (isCheckedTerms) {
      console.log('cheguei')
      router.push('/')
    }
  }, [isCheckedTerms])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none mt-2"
        value="tab2"
      >
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

        <div className='mb-4'>
          <fieldset className="mx-auto w-full flex flex-col justify-start">
            <label className="text-[14px] leading-none mb-2.5 text-violet12 block" htmlFor='Confirme sua Senha'>
              Confirme sua Senha
            </label>
            <div className="flex grow shrink-0 rounded-lg px-3 text-[14px] leading-none shadow-[0_0_0_1px] shadow-[--border] h-11 focus:shadow-[0_0_0_2px] focus:shadow-[--border] outline-none">
              <input
                {...register('confirmPassword', { required: true })}
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
          {!!errors.confirmPassword && (
            <span className='m-0 text-[12px] text-rose-600'>{errors.confirmPassword.message}</span>
          )}
        </div>



        <div className="flex items-center my-6">
          <Checkbox.Root
            required
            checked={isCheckedTerms}
            onCheckedChange={() => setIsCheckedTerms(!isCheckedTerms)}
            className="flex h-6 w-6 appearance-none items-center justify-center rounded bg-white shadow-[1px_2px_7px] shadow-zinc-300 outline-none focus:shadow-[0_0_0_1px_gray]"
            id="c1"
          >
            <Checkbox.Indicator className="text-[--primary]">
              <BsCheck />
            </Checkbox.Indicator>
          </Checkbox.Root>

          <label className="pl-4 text-[13px] leading-none flex-wrap" htmlFor="c1">
            Aceito os <a className='underline cursor-pointer'>Termos de Uso</a> e <a className='underline cursor-pointer'>Políticas de Privacidade</a>.
          </label>
        </div>

        <button className="outline-none font-normal text-[14px] flex w-full mt-6 items-center justify-center h-12 bg-[--primary] rounded-md px-6 cursor-pointer text-white hover:text-zinc-100">
          Cadastrar
        </button>

      </Tabs.Content>
    </form>
  )
}

export { RegisterTab };
