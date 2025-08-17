'use client';

import revalidateAction from '../../actions/revalidate';

export default function RevalidateButton() {
  return <button onClick={() => revalidateAction()}>Refetch data</button>;
}
