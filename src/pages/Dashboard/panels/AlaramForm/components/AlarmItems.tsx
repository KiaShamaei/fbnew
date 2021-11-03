import React, { Fragment } from 'react';
import '../assets/AlarmItems.scss'
interface Props {

}

export default function AlarmItems ({} : Props ) { 


  const data = [{alertName : 'فتوسا',reason:'تغییر قیمت', description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/18',time:'10:15:22'},
  {alertName : 'سپیده',reason:'حجم', description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/22',time:'16:25:20'},
  {alertName : 'وپارس',reason:'تغییر قیمت' , description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/26',time:'11:14:00'},
  {alertName : 'فولاد',reason:'تغییر قیمت', description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/28',time:'19:15:44'},
  {alertName : 'شتران',reason:'حجم', description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/30',time:'22:45:17'},
  {alertName : 'شتران',reason:'حجم', description:'این قسمت توضیحات یا دلیلی است برای ست کردن آلارم',date:'1400/05/30',time:'22:45:17'}]

  return (
    <Fragment>
      {data.map((item:any)=>{
        return (
<div className={'alarm-items'}>
        <div className='head d-flex'>
          <div className='alarm-name-and-title d-flex flex-grow-1'>
              <span className="alarm-name">
                {item.alertName}   
              </span>
              <span className='alarm-reason'>
                {item.reason}
              </span>
          </div>
          <div className="date-and-delete d-flex">
                    <span className="date">
                        {item.date}
                    </span>
                    <span className="time">
                      {item.time}
                    </span>
                    <i className="online-icon-delete delete cursor-pointer"></i>
                </div>
            </div>
        <div className="body">
              {item.description}
            </div>
      </div> 
        )
      })}
      
    </Fragment>
  )
}