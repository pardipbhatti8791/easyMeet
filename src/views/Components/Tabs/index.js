import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabComponent = props => {
    return (
        <div className='user-tabWrapper'>
            <Tabs>
                <TabList>
                    {props.tabs.map((tab, i) => (
                        <Tab key={i}>{tab}</Tab>
                    ))}
                </TabList>
                {props.children.map((comp, i) => (
                    <TabPanel key={i}>{comp}</TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default TabComponent;
