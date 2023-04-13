

import { FiX } from '@/components/Icons';
import { Input } from '@/components/Input';
import * as Dialog from '@radix-ui/react-dialog';


const ForgotPasswordDialog = () => {
  return (

    <Dialog.Portal>
      <Dialog.Overlay className="bg-black opacity-30 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="m-0 text-lg font-medium">
          Esqueci minha senha
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Insira seu endereço de e-mail para recuperar sua senha.
        </Dialog.Description>

        <Input
          id="email"
          label="Email"
          placeholder="Email"
          type='email'
        />

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="w-full bg-[--primary] text-white text=[14px] focus:shadow-[--black-light] inline-flex h-10 items-center justify-center rounded px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Enviar e-mail
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-[--primary] hover:bg-[--black-light] focus:shadow-[--black-light] absolute top-2 right-2 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <FiX />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export { ForgotPasswordDialog }