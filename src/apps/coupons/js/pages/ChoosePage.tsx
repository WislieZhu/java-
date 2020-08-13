import '../../sass/ChoosePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import UParams from '../../../../assets/libs/uparams';

const { Header, Content } = Layout;

interface AddPageProps {
    mchId: number,
}

class AddPage extends React.Component<AddPageProps, {
    type?: number;
    cardId?: number;
}>{

    constructor(props: AddPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

        let parms = UParams();

        if (parms.type) {
            this.setState({ type: parms.type });
        }

        if (parms.cardid) {
            this.setState({ cardId: parms.cardid });
        }

    }

    render() {

        const ChooseContent = () => {
            return (
                <div className='setion'>
                    <div className='list l-1' onClick={() => { this.state.cardId ? window.location.href = '#/selfcard?cardid=' + this.state.cardId + '?mchid=' + this.props.mchId : window.location.href = '#/selfcard?mchid=' + this.props.mchId }}><div className='left fl'>自助领券</div><div className='right fr'></div></div>
                    <div className='list l-2' onClick={() => { this.state.cardId ? window.location.href = '#/selfmadecard?cardid=' + this.state.cardId + '?mchid=' + this.props.mchId : window.location.href = '#/selfmadecard?mchid=' + this.props.mchId }}><div className='left fl'>定制发券</div><div className='right fr'></div></div>
                    <div className='list l-3'><div className='left fl'>下单返券</div><div className='right fr'></div></div>
                </div>
            )
        }


        return (
            <Layout>
                {this.state.type == 1 ? <Header title='' className='no-border' /> : <Header title='请选择卡券上线方式' />}

                <Content>
                    <div className="wrap clearfix" data-page='choose'>
                        {this.state.type == 1 ?
                            <div>
                                <div className='headbar'>
                                    <div className='img'></div>
                                    <div className='t-1'>卡券创建成功</div>
                                </div>
                                <div className='t-2'>请选择卡券上线方式</div>
                            </div> : undefined}
                        <ChooseContent />
                        {this.state.type == 1 ? <div className='btn' onClick={() => window.location.href = '#/?shopid=' + this.props.mchId}>返回卡券列表</div> : undefined}
                    </div>

                </Content>
            </Layout>);
    }


}

export default AddPage;