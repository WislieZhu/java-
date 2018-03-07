import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import CouponApis from '@jx/sardine-apiservice/lib/coupon-apis';
//import CouponApis from '../../../../services/coupon-apis';
import classNames from 'classnames';
import moment from 'moment';
import { DatePicker, Modal } from 'antd-mobile';
import UParams from '../../../../assets/libs/uparams';
import ChooseCard from './ChooseCard';

import { SardineApiClient } from '@jx/sardine-api';

const { Header, Content } = Layout;

interface SelfServiceCardProps {
    mchId: number,
    apiClient: SardineApiClient
}

class SelfServiceCard extends React.Component<SelfServiceCardProps, {
    cardList?: any;
    cardInfo?: any;
    cardId?: any;
    num?: number;
    beginDate?: Date;
    endDate?: Date;
    setNum?: number;
    price?: string;
    chooseCards: boolean;
    pageSize: number;
    pageNumber: number;
    isCard: boolean;
}>{
    CouponApis: CouponApis;
    constructor(props: SelfServiceCardProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            chooseCards: false,
            pageSize: 999,
            pageNumber: 0,
            isCard: false,
        };
        this.CouponApis = new CouponApis(props.apiClient);
    }

    componentWillMount() {

        this.CouponApis.getMerchantCouponDefineList({ merchantId: this.props.mchId, page_size: this.state.pageSize, page_number: this.state.pageNumber }).then(data => {
            this.setState({
                cardList: data
            }, () => {
                let parms = UParams();
                if (!this.state.cardId) {
                    if (parms.cardid && parms.cardid > 0) {
                        let s = this.state.cardList.couponDefineDTOList.find(p => p.couDefId == parms.cardid);
                        if (s) {
                            this.setState({
                                cardInfo: s,
                                isCard: true,
                                cardId: parms.cardid
                            })
                        }
                    }
                }
                else {
                    let s = this.state.cardList.couponDefineDTOList.find(p => p.couDefId == this.state.cardId);
                    if (s) {
                        this.setState({
                            cardInfo: s,
                            isCard: true,
                        })
                    }
                }
            })
        })

    }


    onSubmit(_num) {

        window.location.href = '#/selfcardlist?shopid=' + this.props.mchId;

        if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
            Modal.alert('提示', '开始时间无效');
            return;
        }

        if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
            Modal.alert('提示', '结束时间无效');
            return;
        }
    }


    mainRender() {

        const re = /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/;
        const data1 = ['', '满减券', '代金券', '凭证券'];
        const item1 = this.state.cardInfo;

        const CardPZ = (props: { item: any, status: number }) => {
            const pros = props.item.products;
            return (
                <div className='card card-ping'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-0'>{pros && pros.length > 0 ? pros.map(s => <span key={s.id}>{s.productName + 'x' + s.num}</span>) : undefined}</div>
                    {props.item.products[0].isServer ? <div className='text-1'>{props.item.products[0].serverContent}</div> : undefined}
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                </div>)
        }

        const CardMJ = (props: { item: any, status: number }) => {
            return (
                <div className='card card-man'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-1'>消费满{props.item.marketingMeta.marketMeta[0].fullAmount / 100}元可用</div>
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                    <div className='text-5'>￥<em>{props.item.marketingMeta.marketMeta[0].discountAmount / 100}</em></div>
                </div>
            )
        }

        const CardDJ = (props: { item: any, status: number }) => {
            return (
                <div className='card card-dai'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                    <div className='text-5'>￥<em>{props.item.marketingMeta.marketMeta[0].faceAmount / 100}</em></div>
                </div>
            )
        }

        const NoCard = () => {
            return (
                <div className='no-card'></div>
            )
        }

        return (

            <Layout>
                <Header title='新增自助领券' />
                <Content>
                    <div className="wrap" data-page='selfcard'>

                        <div className='row' onClick={() => this.setState({ chooseCards: true })}>
                            <div className='left fl'>选择卡券</div>
                            <div className='right fr'>
                                <span>{this.state.isCard ? data1[item1.couponType] : '请选择'}</span>
                            </div>
                        </div>

                        {this.state.isCard ?
                            item1.couponType == 1 ?
                                <CardMJ item={item1} status={item1.status} />
                                : item1.couponType == 3 ?
                                    <CardPZ item={item1} status={item1.status} />
                                    : <CardDJ item={item1} status={item1.status} />
                            : <NoCard />}

                        <div className='row'>
                            <div className='left fl'>可领数量</div>
                            <div className="right fr"><input type="text" placeholder="请输入每个用户可领券数 默认为1" value={this.state.num || ''} onChange={e => this.setState({ num: parseInt(e.target.value) })} /></div>
                        </div>

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
                                    <div className="left fl">领取开始时间</div>
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
                                    <div className="left fl">领取结束时间</div>
                                    <div className="right fr">
                                        <span>{this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                                        <i></i>
                                    </div>
                                </div>
                            </DatePicker>

                        </div>

                        <div className='row'>
                            <div className='left fl'>设置库存量</div>
                            <div className="right fr"><input type="text" placeholder="设置发放数量 不填写时为不限" value={this.state.setNum || ''} onChange={e => this.setState({ setNum: parseInt(e.target.value) })} /></div>
                        </div>

                        <div className='row'>
                            <div className='left fl'>单价</div>
                            <div className="right fr"><input type="text" placeholder="请设置单价" value={this.state.price || ''}
                                onChange={e => {
                                    let result = re.test(e.target.value);
                                    if (result || !e.target.value) this.setState({ price: e.target.value });
                                }} /></div>
                        </div>

                        <div className='btn btn-1' onClick={() => this.onSubmit(1)}>保存</div>
                        <div className='btn btn-2' onClick={() => this.onSubmit(2)}>立即发布</div>

                    </div>

                </Content>
            </Layout>);
    }

    render() {
        if (this.state.chooseCards) {
            return <ChooseCard storeId={this.props.mchId} cardId={this.state.cardId} cardList={this.state.cardList} onSelect={cardInfo => {
                this.setState({
                    cardInfo: cardInfo,
                    chooseCards: false,
                    isCard: true,
                    cardId: cardInfo.couDefId
                })
            }} />
        } else {
            return this.mainRender();
        }
    }

}

export default SelfServiceCard;