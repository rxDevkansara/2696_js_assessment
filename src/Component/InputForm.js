import { useEffect, useState } from "react";
import userImg from '../assets/images/All ICON/person.imageset/person@2x.png';
import cakeImg from '../assets/images/All ICON/cake.imageset/cake@2x.png';
import age18Img from '../assets/images/All ICON/18.imageset/18@2x.png'
import guardImg from '../assets/images/All ICON/name_tag.imageset/name_tag@2x.png'
import rsnImg from '../assets/images/All ICON/chief_complain.imageset/chief_complain@2x.png'
import medImg from '../assets/images/All ICON/current_medication.imageset/current_medication@2x.png'
import allergiesImg from '../assets/images/All ICON/allergy.imageset/allergy@2x.png'
import phoneImg from '../assets/images/All ICON/Phone No-1.imageset/Phone No@2x.png'
import uploadImg from '../assets/images/All ICON/upload_photo.imageset/upload_photo@2x.png'
import './InputForm.css'
import Card from './UI/Card'


const InputForm = () => {
    const [patient_fname, setPatientFName] = useState(localStorage.getItem('patient_fname'));
    const [patient_lname, setPatientLName] = useState(localStorage.getItem('patient_lname'));
    const [patient_dob, setPatientDOB] = useState(localStorage.getItem('patient_dob'));
    const [guardians_fname, setGFName] = useState(localStorage.getItem('guardians_fname'));
    const [guardians_lname, setGLName] = useState(localStorage.getItem('guardians_lname'));
    const [patient_age_18, setPatientAge_18] = useState(localStorage.getItem('patient_age_18'));
    const [patient_primary_reason, setPatientPrimaryReason] = useState(localStorage.getItem('patient_primary_reason'));
    const [patient_curr_medication, setPatientCurrMedication] = useState(localStorage.getItem('patient_curr_medication'));
    const [patient_allergies, setPatientAllergies] = useState(localStorage.getItem('patient_allergies'));
    const [patient_cno, setPatientCNo] = useState(localStorage.getItem('patient_cno'));
    const [disabled_age, setDisabledAge] = useState(false)
    const [files, setFiles] = useState(localStorage.getItem('files'))

    const [localStorageIsEmpty, setLocalStorageIsEmpty] = useState(true);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            localStorage.clear();
            setLocalStorageIsEmpty(false)
        }, 1800000);
        return () => clearTimeout(timeOutId);
    }, [localStorageIsEmpty]);
    
    var loaded_files = ''
    if(files && files.length){
        var parse_files = JSON.parse(files)
        loaded_files = parse_files.map((file,index) => <img key={index} className="file-img" src={file} alt='img'/>)
    }
    
    const dob_handler = (e) => {
        setPatientDOB(e.target.value)
        const current_date = new Date();
        const selected_date = new Date(e.target.value);
        if ((current_date.getFullYear() - selected_date.getFullYear()) > 18){
            setDisabledAge(true)
        }else{setDisabledAge(false)}
    }
    const fileHandler = (e) =>{
        for (let i = 0; i <  e.target.files.length; i++) {
            var stored_files = files;
            var files_list = []
            if (stored_files && stored_files.length){
                files_list = JSON.parse(localStorage.getItem('files'))
                files_list.push(URL.createObjectURL(e.target.files[i]))
            }else{
                files_list.push(URL.createObjectURL(e.target.files[i]))
            }
            setFiles(JSON.stringify(files_list));
        }
    }
    const submitForm = (e) =>{
        e.preventDefault();
        localStorage.setItem('patient_fname', patient_fname)
        localStorage.setItem('patient_lname', patient_lname)
        localStorage.setItem('patient_dob', patient_dob)
        localStorage.setItem('guardians_fname', guardians_fname)
        localStorage.setItem('guardians_lname', guardians_lname)
        localStorage.setItem('patient_age_18', patient_age_18)
        localStorage.setItem('patient_primary_reason', patient_primary_reason)
        localStorage.setItem('patient_curr_medication', patient_curr_medication)
        localStorage.setItem('patient_allergies', patient_allergies)
        localStorage.setItem('patient_cno', patient_cno)
        localStorage.setItem('files', files)

    }

    return (
        <>
            <form>
                <div className="form-control">
                    <Card>
                        <img className='form-icon' src={userImg} alt='fname'/>
                        <label htmlFor="lname">  | Patient First Name</label>
                        <input 
                            type='text'
                            name='lname'
                            value={patient_fname}
                            onChange={(e)=>setPatientFName(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={userImg} alt='fname'/>
                        <label htmlFor="lname">  | Patient Last Name</label>
                        <input 
                            type='text'
                            name='lname'
                            value={patient_lname}
                            onChange={(e)=>setPatientLName(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={cakeImg} alt='fname'/>
                        <label htmlFor="dob"> | Patient DOB</label>
                        <input 
                            type='date'
                            name='dob'
                            value={patient_dob}
                            onChange={(e)=>dob_handler(e)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={age18Img} alt='fname'/>
                        <label htmlFor="age_18"> | Above 18</label>
                        <label className="radio-label"><input
                            type='radio'
                            name='age_18'
                            value='yes'
                            className="input-radio"
                            disabled={!disabled_age && 'disabled'}
                            onChange={(e)=>setPatientAge_18(e.target.value)}
                        /> Yes</label>
                        <label><input
                            type='radio'
                            name='age_18'
                            value='yes'
                            className="input-radio"
                            disabled={!disabled_age && 'disabled'}
                            onChange={(e)=>setPatientAge_18(e.target.value)}
                        /> No</label>
                    </Card>
                    <Card>
                        <img className='form-icon' src={guardImg} alt='fname'/>
                        <label htmlFor="gfname"> | Guardian's  First Name</label>
                        <input 
                            type='text'
                            name='gfname'
                            value={guardians_fname}
                            onChange={(e)=>setGFName(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={guardImg} alt='fname'/>
                        <label htmlFor="glname"> | Guardian's Last Name</label>
                        <input 
                            type='text'
                            name='glname'
                            value={guardians_lname}
                            onChange={(e)=>setGLName(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={rsnImg} alt='fname'/>
                        <label htmlFor="fname"> | Primary reason of visit</label>
                        <input 
                            type='text'
                            name='prim_rsn'
                            value={patient_primary_reason}
                            onChange={(e)=>setPatientPrimaryReason(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={medImg} alt='fname'/>
                        <label htmlFor="fname"> | Current Medication</label>
                        <input 
                            type='text'
                            name='curr_med'
                            value={patient_curr_medication}
                            onChange={(e)=>setPatientCurrMedication(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={allergiesImg} alt='fname'/>
                        <label htmlFor="allergies"> | Allergies</label>
                        <input 
                            type='textbox'
                            name='allergies'
                            value={patient_allergies}
                            onChange={(e)=>setPatientAllergies(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={userImg} alt='fname'/>
                        <label htmlFor="state"> | Patient First Name</label>
                        <select 
                            name='state'
                            onChange={(e)=>setPatientFName(e.target.value)}
                        >
                            <option value='SA'>SA</option>
                            <option value='CA'>CA</option>
                            <option value='NYC'>NYC</option>
                            <option value='IN'>IN</option>
                        </select>
                    </Card>
                    <Card>
                        <img className='form-icon' src={phoneImg} alt='phone number'/>
                        <label htmlFor="pharm_phone_num"> | Pharmarcy Phone Number</label>
                        <input 
                            type='number'
                            name='pharm_phone_num'
                            value={patient_cno}
                            onChange={(e)=>setPatientCNo(e.target.value)}
                        />
                    </Card>
                    <Card>
                        <img className='form-icon' src={uploadImg} alt='phone number'/>
                        <label htmlFor="photos"> | Upload Photos (Optional)</label>
                        <input 
                            type='file'
                            name='photos'
                            style={{content:'none'}}
                            multiple={true}
                            onChange={(e)=>fileHandler(e)}
                        />
                        {loaded_files}
                    </Card>
                    <Card>
                        <input type="submit" className="btn-submit" onClick={submitForm} value='Next' />
                    </Card>
                </div>

            </form>
        </>
    )
}

export default InputForm;