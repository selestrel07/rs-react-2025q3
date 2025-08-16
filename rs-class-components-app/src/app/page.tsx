import { redirect } from 'next/navigation';

export default function BasePage() {
  redirect('/main/?page=1');
}
