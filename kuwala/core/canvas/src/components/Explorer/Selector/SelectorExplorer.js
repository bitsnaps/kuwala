import React, {useMemo} from "react";
import ReactTable from "react-table-6";
import "./selector-style.css";
import {useStoreState} from "easy-peasy";

const Table = ({columns, data}) => {
    const { selectedColumnAddress } = useStoreState(state => state.canvas);

    const memoizedCols = useMemo(()=> {
        return columns
    },[]);

    const populatedData = data.map((el)=> {
        return {
            ...el,
            selected: selectedColumnAddress.includes(el.columnAddress),
        }
    });

    let pageSize;
    if (populatedData.length >= 300) pageSize = 300
    else pageSize = populatedData.length

    return (
        <div className={'selector-explorer h-full'}>
            <ReactTable
                data={populatedData}
                columns={memoizedCols}
                defaultPageSize={pageSize}
                showPagination={false}
                showPaginationTop={false}
                showPaginationBottom={false}
                showPageSizeOptions={false}
                style={{
                    height: "100%",
                    overFlowX: 'hidden',
                    overFlowY: 'auto',
                }}
            />
        </div>
    )
}

export default (
    {
        selectedTable,
        isColumnsDataPreviewLoading,
        columnsPreview,
    }) => {
    const renderDataPreviewBody = () => {
        return (
            <>
                {selectedTable
                    ?
                    isColumnsDataPreviewLoading
                        ?
                        <div className="flex flex-col w-full h-full justify-center items-center rounded-tr-lg">
                            <div
                                className="spinner-border animate-spin inline-block w-24 h-24 border-4 text-kuwala-green rounded-full"
                                role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        <>
                            <div className={'flex flex-row justify-between mx-8 mb-4'}>
                                <div className={'flex flex-row items-center'}>
                                    <span
                                        className={'bg-kuwala-light-green px-4 py-1 font-semibold text-sm text-kuwala-green rounded-lg'}
                                    >Columns</span>
                                </div>
                                <div className={'flex flex-row space-x-2'}>
                                    <button
                                        className={'bg-white px-4 py-1 text-sm font-semibold text-kuwala-green rounded-lg border-2 border-kuwala-green'}
                                    >Select All</button>
                                    <button
                                        className={'bg-white px-4 py-1 text-sm font-semibold text-kuwala-green rounded-lg border-2 border-kuwala-green'}
                                    >Deselect All</button>
                                </div>
                            </div>
                            <div className={'flex flex-col overflow-x-auto mx-8 mb-8 rounded-lg border-2 border-kuwala-green'}>
                                <Table columns={columnsPreview.columns} data={columnsPreview.rows}/>
                            </div>
                        </>
                    :
                    <div className="flex flex-col w-full h-full text-xl font-light justify-center items-center rounded-tr-lg">
                        <p>Select a table from the <span className={'text-kuwala-green'}>left</span></p>
                        <p>to preview the data</p>
                    </div>
                }
            </>
        )
    }

    return (
        renderDataPreviewBody()
    )
}