import './AppDownload.css'
import {assets} from '../../assets/assets.js'

const AppDownload=()=>{
    return(
        <div className='app-download' id='app-download' >
            <p>Download app if using Smartphone!<br/>UBER App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
