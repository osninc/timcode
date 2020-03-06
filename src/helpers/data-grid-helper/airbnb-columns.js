// href: "/rooms/28982266?location=Montevideo&check_in=2020-03-03&check_out=2020-03-03&previous_page_section_name=1000&search_id=f8bee5ed-e181-a3e5-bd3f-345bfe310d6a&federated_search_id=d577a31f-a2e8-4e26-97fc-4841b7a9dfc0"
// rating: "4.92"
// review: "84 evaluaciones"
// title: "Habitación privada"
// subTitle: "la casa de Jota.Ce"
// info: "2 huéspedes · 1 habitación · 1 cama · 1 baño entero y uno de tocador compartidos, Wifi · Cocina"
// price: "Total: $26 USD"

export const columnDef = [
    {
        headerName: 'ID',
        field: 'id',
        colId: 'id',
        suppressSizeToFit: true,
        enableRowGroup: true,
    },
    {
        headerName: 'Details',
        field: 'subTitle',
        colId: 'subTitle',
        sortable: true,
        filter: true
    },
    {
        headerName: 'Title',
        field: 'title',
        colId: 'title',
        sortable: true,
        width: 200,
        filter: true,
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
    {
        headerName: 'Rating',
        field: 'rating',
        colId: 'rating',
        sortable: true,
        filter: "agNumberColumnFilter"
    }
];
