// href:
//     address:
//     id,
//     info:
//     price:

export const columnDef = [
    {
        headerName: 'ID',
        field: 'id',
        colId: 'id',
        suppressSizeToFit: true,
        enableRowGroup: true,
    },
    {
        headerName: 'Address',
        field: 'address',
        colId: 'address',
        sortable: true,
        width: 200,
        filter: true,
        flex: 1
    },
    {
        headerName: 'Info',
        field: 'info',
        colId: 'info',
        sortable: true,
        filter: true,
        flex: 1,
    },
    {
        headerName: 'Price',
        field: 'price',
        colId: 'price',
        sortable: true,
    },
];
