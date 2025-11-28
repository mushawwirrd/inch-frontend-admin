function Table({ data, columns }) {
    return (
        <div className=" rounded-lg overflow-x-auto">

            <table className="w-full">

                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="bg-primary/20 px-12 py-3">{col.title}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {columns === 0 ? (
                        <tr>
                            <th>Tidak ada data</th>
                        </tr>
                    ) : (
                        data.map(row => (
                            <tr key={row.id} className="bg-gray-50 hover:bg-gray-100">
                                {columns.map((col, i) => (
                                    <td key={i} className="text-center whitespace-nowrap">
                                        {col.render ? col.render(row) : row[col.propertie]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>

            </table>




        </div>
    )
}

export default Table