import React from 'react';
import { TextContainer, TextHeading } from '../../styles/Content';
import ListItemText  from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { ListItemIcon } from '@mui/material';
import { Grade } from '@mui/icons-material';

export default function BusinessDetail() {
    return (
        <div className="container-fluid" style={{margin:'2%',padding:'2%'}}>
            <div className="row">
                <div className="col-6" style={{overflow:'hidden'}}>
                    <img src="images/banner/informal.gif" alt=""/>
                </div>
                <div className="col-6" style={{marginTop:'auto',marginBottom:'auto'}}>
                    <TextHeading variant="h3">Informal model</TextHeading>
                    <TextContainer>
                        This model is the most transient and speculative of all contract farming models, with a risk of default by both the promoter and the farmer” (van Gent, n.d., p.5). However, this depends on the situation: interdependence of contract parties or long-term trustful relationships may reduce the risk of opportunistic behaviour. Special features of this CF model are:
                    </TextContainer>
                    <List
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px', wordWrap: 'break-word' }}
                    >
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Small firms conclude simple, informal seasonal production contracts with smallholders.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The success often depends on the availability and quality of external extension services.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Embedded services, if at all provided, are limited to the delivery of basic inputs, occasionally on credit; advice is usually limited to grading and quality control.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Typical products: requiring minimal processing/ packaging, vertical coordination; e.g. fresh fruit/ vegetables for local markets, sometimes also staple crops.
                        </ListItemText>
                    </List>
                </div>
            </div><br /><br />
            <div className="row">
                <div className='col-6' style={{marginTop:'auto',marginBottom:'auto'}}>
                    <TextHeading variant="h3">Intermediary model</TextHeading>
                    <TextContainer>
                        In this model, the buyer subcontracts an intermediary (collector, aggregator or farmer organisation) who formally or informally contracts farmers (combination of the centralised/ informal models). Special characteristics of this CF model are:
                    </TextContainer>
                    <List
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px', wordWrap: 'break-word' }}
                    >
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The intermediary provides embedded services (usu- ally passing through services provided by buyers against service charges) and purchases the crop.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>This model can work, if well-designed and if incentive-structures are adequate and control mechanisms are in place.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>This model can bear disadvantages for vertical coordination and for providing incentives to farmers (buyers may lose control of production processes, quality assurance and regularity of supplies; farmers may not benefit from technology transfer; there is also a risk of price distortion and reduced incomes for farmers).
                        </ListItemText>
                    </List>
                </div>
                <div className="col-6" style={{overflow:'hidden',marginBottom:'auto',marginTop:'auto'}}>
                    <img src="images/banner/intermediary.jpg" alt="" />
                </div>
            </div><br /><br />
            <div className="row">
                <div className="col-6" style={{overflow:'hidden',textAlign:'center'}}>
                    <img src="images/banner/multipartite.gif" alt=""/>
                </div>
                <div className="col-6" style={{marginTop:'auto',marginBottom:'auto'}}>
                    <TextHeading variant="h3">Multipartite model </TextHeading>
                    <TextContainer>
                        This model can develop from the centralised or nucleus estate models, e.g. following the privatisation of para- statals. It involves various organisations such as govern- mental statutory bodies alongside private companies and sometimes financial institutions. Special features:
                    </TextContainer>
                    <List
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px', wordWrap: 'break-word' }}
                    >
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>This model may feature as joint ventures of parastatals/ community companies with domestic/ foreign investors for processing.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The vertical coordination depends on the discretion of the firm. Due attention has to be paid to possible political interferences.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>This model may also feature as farm-firm arrangement complemented by agreements with 3rd party service providers (e.g. extension, training, credits, inputs, logistics).
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Separate organisations (e.g. cooperatives) may organise farmers and provide embedded services (e.g. credits, extension, marketing, sometimes also processing).
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>This model may involve equity share schemes for producers.
                        </ListItemText>
                    </List>
                </div>
            </div><br /><br />
            <div className="row">
                <div className="col-6" style={{marginTop:'auto',marginBottom:'auto'}}>
                    <TextHeading variant="h3">Centralized model</TextHeading>
                    <TextContainer>
                        In this model, the buyers’ involvement may vary from minimal input provision (e.g. specific varieties) to control of most production aspects (e.g. from land preparation to harvesting). This is the most common CF model, which can be characterised as follows:
                    </TextContainer>
                    <List
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px', wordWrap: 'break-word' }}
                    >
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The buyer sources products from and provides services to large numbers of small, medium or large farmers.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The relation/ coordination between farmers and contractor is strictly vertically organised.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The quantities (quota), qualities and delivery conditions are determined at the beginning of the season.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The production and harvesting processes and qualities are tightly controlled, sometimes directly implemented by the buyer’s staff.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Typical products: large volumes of uniform quality usually for processing; e.g. sugar cane, tobacco, tea, coffee, cotton, tree crops, vegetables, dairy, poultry.
                        </ListItemText>
                    </List>
                </div>
                <div className="col-6" style={{overflow:'hidden',textAlign:'center'}}>
                    <img src="images/banner/centralized.gif" alt="" />
                </div>
            </div><br /><br />
            <div className="row">
            <div className="col-6" style={{overflow:'hidden',margin:'auto',textAlign:'center'}}>
                    <img src="images/banner/nucleus.jpg" alt="" />
                </div>
                <div className='col-6' style={{marginTop:'auto',marginBottom:'auto'}}>
                    <TextHeading variant='h3'>Nucleus estate model </TextHeading>
                    <TextContainer>
                    In this model, the buyer sources both from own estates/ plantations and from contracted farmers. The estate system involves significant investments by the buyer into land, machines, staff and management. This CF model can be characterised as follows:
                    </TextContainer>
                    <List
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px', wordWrap: 'break-word' }}
                    >
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The nucleus estate usually guarantees supplies to assure cost-efficient utilisation of installed processing capacities and to satisfy firm sales obligations respectively.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>In some cases, the nucleus estate is used for research, breeding or piloting and demonstration purposes and/ or as collection point.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>The farmers are at times called ‘satellite farmers’ illustrating their link to the nucleus farm. This model was in the past often used for state owned farms that re-allocated land to former workers. It is nowadays also used by the private sector as one type of CF. This model is often referred to as “outgrower model”.
                        </ListItemText>
                        <ListItemText>
                            <ListItemIcon><Grade /></ListItemIcon>Typical products: perennials
                        </ListItemText>
                    </List>
                </div>
            </div>
        </div>
    )
}