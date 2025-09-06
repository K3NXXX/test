import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

type RowData = {
	year: number
	[month: string]: number | string
}

type TransposedRowData = {
	month: string
	[year: string]: number | string
}

const initialYears = [2022, 2023, 2024]
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

export default function EditableTable() {
	const [data, setData] = useState<RowData[]>(
		initialYears.map(year => {
			const row: RowData = { year }
			months.forEach(month => (row[month] = ''))
			return row
		})
	)

	const [isTransposed, setIsTransposed] = useState(false)

	const transposedData = useMemo<TransposedRowData[]>(() => {
		return months.map(month => {
			const row: TransposedRowData = { month }
			data.forEach(yearRow => {
				row[yearRow.year.toString()] = yearRow[month]
			})
			return row
		})
	}, [data])

	const handleNormalCellChange = (
		rowIndex: number,
		month: string,
		value: string
	) => {
		const newData = [...data]
		newData[rowIndex][month] = value
		setData(newData)
	}

	const handleTransposedCellChange = (
		month: string,
		year: string,
		value: string
	) => {
		const newData = [...data]
		const yearIndex = data.findIndex(d => d.year.toString() === year)
		if (yearIndex !== -1) {
			newData[yearIndex][month] = value
			setData(newData)
		}
	}

	const handlePreviousYear = () => {
		const firstYear = data[0]?.year ?? new Date().getFullYear()
		const newRow: RowData = { year: firstYear - 1 }
		months.forEach(month => (newRow[month] = ''))
		setData([newRow, ...data])
	}

	const handleCopyTable = () => {
		if (isTransposed) {
			const header = ['Month', ...data.map(d => d.year.toString())]
			const rows = months.map(month => [
				month,
				...data.map(yearRow => yearRow[month]),
			])
			const csv = [header, ...rows].map(r => r.join('\t')).join('\n')
			navigator.clipboard
				.writeText(csv)
				.then(() => alert('Table copied to clipboard!'))
				.catch(err => alert('Failed to copy table: ' + err))
		} else {
			const header = ['Year', ...months]
			const rows = data.map(row => [
				row.year,
				...months.map(month => row[month]),
			])
			const csv = [header, ...rows].map(r => r.join('\t')).join('\n')
			navigator.clipboard
				.writeText(csv)
				.then(() => alert('Table copied to clipboard!'))
				.catch(err => alert('Failed to copy table: ' + err))
		}
	}

	const handleTranspose = () => setIsTransposed(!isTransposed)

	const renderNormalTable = () => (
		<table border={1} cellPadding={5} style={{ borderCollapse: 'collapse' }}>
			<thead>
				<tr>
					<th>Year</th>
					{months.map(month => (
						<th key={month}>{month}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rowIndex) => (
					<tr key={row.year}>
						<td>{row.year}</td>
						{months.map(month => (
							<td key={month}>
								<input
									type='text'
									value={row[month] as string | number}
									onChange={e =>
										handleNormalCellChange(rowIndex, month, e.target.value)
									}
									style={{ width: '60px', border: 'none', textAlign: 'center' }}
								/>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)

	const renderTransposedTable = () => (
		<table border={1} cellPadding={5} style={{ borderCollapse: 'collapse' }}>
			<thead>
				<tr>
					<th>Month</th>
					{data.map(yearRow => (
						<th key={yearRow.year}>{yearRow.year}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{transposedData.map(row => (
					<tr key={row.month}>
						<td>{row.month}</td>
						{data.map(yearRow => (
							<td key={yearRow.year}>
								<input
									type='text'
									value={row[yearRow.year.toString()] as string | number}
									onChange={e =>
										handleTransposedCellChange(
											row.month,
											yearRow.year.toString(),
											e.target.value
										)
									}
									style={{ width: '60px', border: 'none', textAlign: 'center' }}
								/>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)

	// 🔹 Дані для графіка
	const chartData = {
		labels: months,
		datasets: data.map((row, idx) => ({
			label: row.year.toString(),
			data: months.map(month => Number(row[month]) || 0),
			borderColor: `hsl(${idx * 60}, 70%, 50%)`,
			backgroundColor: `hsl(${idx * 60}, 70%, 50%, 0.5)`,
			fill: false,
			tension: 0.2,
		})),
	}

	return (
		<div style={{ padding: '20px' }}>
			<div style={{ marginBottom: 10 }}>
				<button
					onClick={handlePreviousYear}
					style={{
						padding: '8px 16px',
						marginRight: '10px',
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Previous Year
				</button>
				<button
					onClick={handleCopyTable}
					style={{
						padding: '8px 16px',
						marginRight: '10px',
						backgroundColor: '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Copy Table
				</button>
				<button
					onClick={handleTranspose}
					style={{
						padding: '8px 16px',
						backgroundColor: '#ffc107',
						color: 'black',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					{isTransposed ? 'Show Years as Rows' : 'Show Months as Rows'}
				</button>
			</div>

			<div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
				Current view:{' '}
				{isTransposed
					? 'Months as Rows, Years as Columns'
					: 'Years as Rows, Months as Columns'}
			</div>

			{isTransposed ? renderTransposedTable() : renderNormalTable()}

			<div style={{ marginTop: '30px', width: '100%', maxWidth: '800px' }}>
				<h3>Dynamic Chart</h3>
				<Line data={chartData} />
			</div>
		</div>
	)
}
