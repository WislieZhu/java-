import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import classNames from 'classNames';
import moment from 'moment';
import { Picker, DatePicker, TextareaItem, Modal } from 'antd-mobile';
import ChooseReturn from './ChooseReturn';

const { Header, Content } = Layout;

const data2 = [{
    label: '1天',
    value: 1,
},
{
    label: '2天',
    value: 2,
},
{
    label: '3天',
    value: 3,
},
{
    label: '4天',
    value: 4,
},
{
    label: '5天',
    value: 5,
},
{
    label: '6天',
    value: 6,
},
{
    label: '7天',
    value: 7,
},
{
    label: '8天',
    value: 8,
},
{
    label: '9天',
    value: 9,
},
{
    label: '10天',
    value: 10,
},
{
    label: '11天',
    value: 11,
},
{
    label: '12天',
    value: 12,
},
{
    label: '13天',
    value: 13,
},
{
    label: '14天',
    value: 14,
},
{
    label: '15天',
    value: 15,
}];

const data1 = [{
    label: '立即生效',
    value: 0,
}, {
    label: '1天后生效',
    value: 1,
},
{
    label: '2天后生效',
    value: 2,
},
{
    label: '3天后生效',
    value: 3,
},
{
    label: '4天后生效',
    value: 4,
},
{
    label: '5天后生效',
    value: 5,
},
{
    label: '6天后生效',
    value: 6,
},
{
    label: '7天后生效',
    value: 7,
},
{
    label: '8天后生效',
    value: 8,
},
{
    label: '9天后生效',
    value: 9,
},
{
    label: '10天后生效',
    value: 10,
},
{
    label: '11天后生效',
    value: 11,
},
{
    label: '12天后生效',
    value: 12,
},
{
    label: '13天后生效',
    value: 13,
},
{
    label: '14天后生效',
    value: 14,
},
{
    label: '15天后生效',
    value: 15,
}];


interface SetPZProps {
    storeId: number,
}

class SetPZ extends React.Component<SetPZProps, {
    name?: string;
    type?: number;
    gettime?: number;
    validtime?: number;
    beginDate?: Date;
    endDate?: Date;
    servicetxt?: string;
    selected?: { id: number, num: number, name?: string, price?: number }[];
    chooseFoods: boolean;
}>{

    constructor(props: SetPZProps) {
        super(props);
        this.state = {
            type: 1,
            beginDate: moment().startOf('day').toDate(),
            chooseFoods: false
        };
    }

    componentWillMount() {

    }

    onSubmit() {

        window.location.href = '#/choose/?type=1?shopid=' + this.props.storeId + '?cardid=158';

        if (!this.state.name) {
            Modal.alert('提示', '请输入卡券名称');
            return;
        }

        if (this.state.type == 2) {
            if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
                Modal.alert('提示', '开始时间无效');
                return;
            }

            if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
                Modal.alert('提示', '结束时间无效');
                return;
            }
        }
        else {
            if (this.state.gettime === undefined || this.state.validtime === undefined) {
                Modal.alert('提示', '请选择时间');
                return;
            }
        }

        if ((!this.state.selected || this.state.selected.length < 1) && (!this.state.servicetxt)) {
            Modal.alert('提示', '请选择商品项目或服务内容');
            return;
        }



    }


    mainRender() {

        return (
            <Layout>
                <Header title='新增凭证券' />
                <Content>
                    <div className="wrap" data-page='setpz'>

                        <div className='row'>
                            <div className='left fl'>卡券名称</div>
                            <div className="right fr"><input type="text" placeholder="请输入卡券名称" className="name-input" value={this.state.name || ''} onChange={e => this.setState({ name: e.target.value })} /></div>
                        </div>

                        <div className='headbar i-time'>
                            <div className='text-1'>时间设置</div>
                        </div>

                        <div className='row'>
                            <div className='left fl'>有效期</div>
                        </div>

                        <div className='row'>
                            <div className={classNames("btn-1", { 'active': this.state.type == 1 })} onClick={() => this.setState({ type: 1 })}>领取后有效天数</div>
                            <div className={classNames("btn-2", { 'active': this.state.type == 2 })} onClick={() => this.setState({ type: 2 })}>固定时间区间</div>
                        </div>

                        {this.state.type == 1 ? <div>

                            <Picker
                                data={data1}
                                cols={1}
                                title=""
                                value={this.state.gettime ? [this.state.gettime] : undefined}
                                onOk={vals => { if (vals && vals.length == 1) { this.setState({ gettime: vals[0] }) } }}
                            >
                                <div className="row">
                                    <div className="left fl">领取后</div>
                                    <div className="right fr">
                                        <span>{(data1.find(p => p.value == this.state.gettime) || { label: '请选择时间' }).label}</span>
                                        <i></i>
                                    </div>
                                </div>
                            </Picker>

                            <Picker
                                data={data2}
                                cols={1}
                                title=""
                                value={this.state.validtime ? [this.state.validtime] : undefined}
                                onOk={vals => { if (vals && vals.length == 1) { this.setState({ validtime: vals[0] }) } }}
                            >
                                <div className="row">
                                    <div className="left fl">生效后有效期</div>
                                    <div className="right fr">
                                        <span>{(data2.find(p => p.value == this.state.validtime) || { label: '请选择时间' }).label}</span>
                                        <i></i>
                                    </div>
                                </div>
                            </Picker>



                        </div> :
                            <div>

                                <DatePicker
                                    mode="date"
                                    value={this.state.beginDate}
                                    minDate={moment().startOf('day').toDate()}
                                    onOk={data => {
                                        this.setState({
                                            beginDate: data
                                        })
                                    }}
                                >
                                    <div className="row">
                                        <div className="left fl">起始日期</div>
                                        <div className="right fr">
                                            <span>{this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                                            <i></i>
                                        </div>
                                    </div>
                                </DatePicker>

                                <DatePicker
                                    mode="date"
                                    value={this.state.endDate}
                                    minDate={this.state.beginDate ? moment(this.state.beginDate).add(1, 'day').subtract(1, 'milliseconds').toDate() : moment().startOf('day').toDate()}
                                    onOk={data => {
                                        this.setState({
                                            endDate: data
                                        })
                                    }}
                                >
                                    <div className="row">
                                        <div className="left fl">结束日期</div>
                                        <div className="right fr">
                                            <span>{this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                                            <i></i>
                                        </div>
                                    </div>
                                </DatePicker>

                            </div>}

                        <div className='headbar i-laba'>
                            <div className='text-1'>优惠信息</div>
                            <div className='text-2'>“商品内容”与“服务内容”至少填写一个</div>
                        </div>

                        <div className='row' onClick={() => this.setState({ chooseFoods: true })}>
                            <div className='left fl'>商品内容</div>
                            <div className='right fr'>
                                <span>{this.state.selected && this.state.selected.length > 0 ? '已设置' : '请选择商品项目'}</span>
                            </div>
                        </div>

                        {this.state.selected && this.state.selected.length > 0 ?
                            <div className='section clearfix'>
                                {this.state.selected.map(p => <div key={p.id} className="list">{p.name}x{p.num}</div>)}
                            </div> : undefined
                        }

                        <div className='row'>
                            <div className='left fl'>服务内容</div>
                        </div>

                        <div className='text-area'>
                            <TextareaItem
                                placeholder="请在此输入服务内容"
                                count={30}
                                rows={3}
                                value={this.state.servicetxt || ''}
                                onChange={e => this.setState({ servicetxt: e })} />
                        </div>

                        <div className='btn-submit' onClick={() => this.onSubmit()}>确定并保存</div>

                    </div>

                </Content>
            </Layout>);

    }

    render() {

        if (this.state.chooseFoods) {
            return <ChooseReturn selected={this.state.selected} storeId={this.props.storeId} onEnter={selected => {
                this.setState({
                    selected: selected,
                    chooseFoods: false
                });
            }} />
        } else {
            return this.mainRender();
        }

    }


}

export default SetPZ;