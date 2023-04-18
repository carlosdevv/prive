import * as Separator from '@radix-ui/react-separator';

type DividerParams = {
  orientation?: 'horizontal' | 'vertical';
  my?: string;
}

const Divider = ({ orientation = 'horizontal', my = '15px' }: DividerParams) => {
  return (
    <Separator.Root style={{ height: '1px', margin: `${my} 0` }} className={`flex bg-zinc-300 mx-auto w-full  data-[orentation=${orientation}]:h-px data-[orientation=${orientation}]:w-full `} />
  )
}
export { Divider };
