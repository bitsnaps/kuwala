import React, {useState} from "react";
import {useStoreState} from "easy-peasy";

export default () => {
    const {selectedElement} = useStoreState(state => state.canvas );

    const renderHeader = () => {
        if(selectedElement) {
            return selectedElement.data.columns.map((e,i)=> (<th className={'sticky top-0 px-6 py-3 text-white bg-kuwala-green'}>{e}</th>))
        } else {
            return <></>
        }
    }

    const renderBody = () => {
        if(selectedElement) {
            return selectedElement.data.rows.map((e,i) => (
                <tr className={'bg-white border-2 text-center'}>
                    {e.map((e,i)=> (<td className={'py-6'}>{e}</td>))}
                </tr>
            ))
        }else {
            return <></>
        }
    }

    return (
        // Table Wrapper
        <div
            className={`
                flex
                flex-col
                bottom-0
                h-2/5
                w-full
                z-10
                absolute
                ${selectedElement ? '' : 'hidden'}
                `
            }
        >
            <div className={'flex flex-row items-center justify-center relative p-2'}>
                <div className="rounded-md bg-white border-2 border-kuwala-green">
                    <div className="inline-flex">
                        <input
                            type="radio"
                            hidden
                        />
                        <label htmlFor="roomPrivate"
                               className="radio text-center bg-kuwala-green text-white self-center py-2 px-4 rounded-sm cursor-pointer hover:opacity-75">Table View</label>
                    </div>
                    <div className="inline-flex rounded-lg">
                        <input
                            type="radio"
                            hidden
                        />
                        <label htmlFor="roomPublic" className="radio bg-white text-kuwala-green text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">Variable View</label>
                    </div>
                </div>
            </div>
            <div className={'relative w-full flex-1 overflow-y-scroll overflow-x-hidden'}>
                <table className="table-auto w-full rounded-t-md">
                    <thead className={'rounded-t-md uppercase'}>
                    <tr>
                        {renderHeader()}
                    </tr>
                    </thead>
                    <tbody className={''}>
                        {renderBody()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}