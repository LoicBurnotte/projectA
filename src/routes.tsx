export interface Link {
  label: string
  to: string
  children: React.ReactNode
}

export const links: Link[] = [
  { label: 'Project A', to: '/', children: <div>ProjectA Home</div> },
  { label: 'Test 1', to: '/test1', children: <div>ProjectA Test 1</div> },
  { label: 'Test 2', to: '/test2', children: <div>ProjectA Test 2</div> },
  { label: 'Test 3', to: '/test3', children: <div>ProjectA Test 3</div> },
]
