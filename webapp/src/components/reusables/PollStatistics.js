import { useEffect, useState } from 'react';
import Globals from '../../modules/Globals'
import * as tokenHandler from '../../modules/TokenHandler'


import styles from './PollStatistics.module.css';

import Chart, {
    CommonSeriesSettings,
    ValueAxis,
    Label,
    Legend,
    Series,
    Tooltip,
    Margin,
  } from 'devextreme-react/chart';
  

function PollStatistics(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [fetchData, setFetchData] = useState({})
    const [dataSource, setDataSource] = useState({
        age: '0',
        male: 0,
        female: 0,
        other: 0,
        hidden: 0,
    })

    function customizeTooltip(e) {
        return { text: e.valueText };
    }
    
    function customizeLabel(e) {
        return `${Math.abs(e.value)}`;
    }

    function changeDataset(event) {
        const value = event.target.value;
        if(isNaN(value)) {
            setDataSource(fetchData.total.chartdata)
            return
        }
        setDataSource(fetchData.byOption[value].chartdata)
    }

    useEffect(() => {
        const tokenData = tokenHandler.getTokenData();

        fetch(`${Globals.apiUrl}/votes/fullstats`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: props.pollid
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === "OK") {
                setFetchData(res.statistics)
                setDataSource(res.statistics.total.chartdata)
                setIsLoading(false)
                console.log(res.statistics.total)
            }else {
                props.closePopup()

            }
        })
    }, [])
    
    return (
        <>
        <div onClick={props.closePopup} className={styles.overlay}>
            
        </div>
        <div className={styles.mainContainer}>
                {!isLoading ? (
                    <div className={styles.statsBody}>
                        <div className={styles.header}>
                            <h2>{props.title}</h2><br />
                            <select onChange={changeDataset}>
                                <option value="total">Ogółem</option>
                                {props.options.map(option => {
                                    return <option value={option.id}>{option.name}</option>
                                })}
                            </select>
                        </div>
                        <div className={styles.chartContainer}>

                            <Chart
                                title="Głosy oddane w ankiecie"
                                dataSource={dataSource}
                                className={styles.chart}
                                id="chart"
                                rotated={true}
                                barGroupWidth={18}
                            >
                                <CommonSeriesSettings
                                    type="stackedbar"
                                    argumentField="age"
                                />
                                <Series
                                    valueField="male"
                                    name="Male"
                                    color="#3F7FBF"
                                />
                                <Series
                                    valueField="female"
                                    name="Female"
                                    color="#F87CCC"
                                />
                                <Series
                                    valueField="other"
                                    name="Others"
                                    color="#40ff00"
                                />
                                <Series
                                    valueField="hidden"
                                    name="Not Specified"
                                    color="#eeff00"
                                />
                                <Tooltip
                                enabled={true}
                                customizeTooltip={customizeTooltip}
                                />
                                <ValueAxis>
                                <Label customizeText={customizeLabel} />
                                </ValueAxis>
                                <Legend
                                    verticalAlignment="bottom"
                                    horizontalAlignment="center"
                                >
                                <Margin left={50} />
                                </Legend>

                            </Chart>
                        </div>

                    </div>
                ) : (
                    <div className={styles.loading} >
                        <div className={styles.loader} />
                    </div>  
                )}
            </div>
        </>
        
    );
}

export default PollStatistics;