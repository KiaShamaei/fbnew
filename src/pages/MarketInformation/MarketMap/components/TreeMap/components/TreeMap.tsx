import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { draw } from '../meta/config'
import { IDialogProps, IMapDialogState } from '../meta/types'
import TreeMapDialog from './TreeMapDialog/TreeMapDialog'
import NumberFormatter from 'components/Formatters/NumberFormatter'
import TurnOverPush from 'components/push/TurnOverPush'
import RealLegalPush from 'components/push/RealLegalPush'

interface Props {
    data: any[];
}

export default function TreeMap({
    data
}: Props) {

    const dialogRef = useRef<any>(null)

    const [dialogState, setOpen] = useState<IMapDialogState>({
        isOpen: false
    })

    const openDialog = useCallback((input: IDialogProps) => {
        setOpen({ ...input, isOpen: true })
    }, [])

    const closeDialog = useCallback(() => {
        setOpen({ isOpen: false })
    }, [])

    useEffect(() => {
        if (data && data.length > 0) {
            const parseData = data.map(item => ({ name: item[0], children: item[1].map((d: any[]) => [...d, item[0]]) }))
            draw('chart', {
                id: "Main",
                name: "نقشه بازار بورس",
                data: {},
                children: parseData
            }, '100%',
                openDialog,
                closeDialog,
                10)
        }
    }, [closeDialog, data, openDialog])
  


    return (
        <Fragment>
            <TreeMapDialog
                isin={dialogState.isin ?? ''}
                key="dialog"
                closingPrice={dialogState.closingPrice}
                instrumentName={dialogState.instrumentName}
                instrumentTitle={dialogState.instrumentTitle}
                lastPrice={dialogState.lastPrice}
                closingPricePercent={dialogState.closingPricePercent}
                ref={dialogRef}
                isOpen={dialogState.isOpen}
                close={() => { }}
                defaultX={0}
                defaultY={0}>
                <div className="mt-4 d-flex justify-content-space-between symbol-turnover">
                    <TurnOverPush
                        buyFirmVolumePercentage={dialogState?.buyFirmVolumePercentage}
                        selFirmVolumePercentage={dialogState?.selFirmVolumePercentage}
                        isin={dialogState?.isin ?? ''}
                    />
                </div>
                <RealLegalPush
                    isin={dialogState?.isin ?? ''}
                    buyFirmCount={dialogState.buyFirmCount}
                    buyFirmVolume={dialogState.buyFirmVolume}
                    buyFirmVolumePercentage={dialogState.buyFirmVolumePercentage}
                    buyIndividualCount={dialogState.buyIndividualCount}
                    buyIndividualVolume={dialogState.buyIndividualVolume}
                    buyIndividualVolumePercentage={dialogState.buyIndividualVolumePercentage}
                    selFirmCount={dialogState.selFirmCount}
                    selFirmVolume={dialogState.selFirmVolume}
                    selFirmVolumePercentage={dialogState.selFirmVolumePercentage}
                    selIndividualCount={dialogState.selIndividualCount}
                    selIndividualVolume={dialogState.selIndividualVolume}
                    selIndividualVolumePercentage={dialogState.selIndividualVolumePercentage}
                />
                <div className='d-flex justify-content-center mt-5'>
                    <div style={{ height: '0.5px', backgroundColor: 'gray', width: '92%' }}></div>
                </div>
                <div className='d-flex f-s-12 justify-content-space-between py-4 px-4'>
                    <div className='d-flex flex-direction-col'>
                        <div>گروه</div>
                        <div className='mt-2'>ارزش بازار</div>
                    </div>
                    <div className='d-flex flex-direction-col'>
                        <div>
                            {dialogState.groupName}
                        </div>
                        <div className='text-align-left mt-2'>
                            <NumberFormatter>
                                {dialogState.marketValue ?? 0}
                            </NumberFormatter>
                        </div>
                    </div>
                </div>
            </TreeMapDialog>
            <div className='chart' id='chart' style={{ height: window.innerHeight - 271 }}>

            </div>
        </Fragment>
    )
}

