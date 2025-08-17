'use client';
import { useRouter } from '../../../../i18n/navigation';

export default function NavigationButton({
  nextPage,
  isForward,
  isDisabled = false,
}: {
  nextPage: number;
  isForward: boolean;
  isDisabled?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      className="button-pagination"
      onClick={() => router.push(`/main/?page=${nextPage}`)}
      disabled={isDisabled}
    >
      {isForward ? '>' : '<'}
    </button>
  );
}
