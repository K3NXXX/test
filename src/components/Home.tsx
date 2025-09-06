import { useGetPostsQuery } from '../redux/api'

export interface MetricRow {
	date: string
	netProfit: number
	deviation: string
	completion: string
}

export function Home() {
	const { data: posts } = useGetPostsQuery()
	console.log('posts', posts)

	return (
		<div>
			<p>hello</p>
		</div>
	)
}
