import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import HomePage from './js/pages/HomePage';
import AddPage from './js/pages/AddPage';
import SetPZ from './js/pages/SetPZ';
import SetDJ from './js/pages/SetDJ';
import SetMJ from './js/pages/SetMJ';
import CardDetails from './js/pages/CardDetails';
import ChoosePage from './js/pages/ChoosePage';
import SelfServiceCard from './js/pages/SelfServiceCard';

class Router extends React.Component<{ storeId: number }>{

    render() {
        return (<HashRouter>
            <Switch>

                <Route path='/' exact render={() => <HomePage storeId={this.props.storeId} />} />
                <Route path='/add' render={() => <AddPage storeId={this.props.storeId} />} />
                <Route path='/setpz' render={() => <SetPZ storeId={this.props.storeId} />} />
                <Route path='/setdj' render={() => <SetDJ storeId={this.props.storeId} />} />
                <Route path='/setmj' render={() => <SetMJ storeId={this.props.storeId} />} />
                <Route path='/details' render={() => <CardDetails storeId={this.props.storeId} />} />
                <Route path='/choose' render={() => <ChoosePage storeId={this.props.storeId} />} />
                <Route path='/selfcard' render={() => <SelfServiceCard storeId={this.props.storeId} />} />

            </Switch>
        </HashRouter>);

    }
}

export default Router;