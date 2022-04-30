import styles from './DisplayProfile.module.css'
import { IoArrowBack } from "react-icons/io5";
import { removeStudentFromPreceptor } from '../../api-lib/azure/azureOps';

export default function StudentPreview(props) {
    const student = props.data
    const clinic_id_1 = student.assignment.primary_choice.clinic_id
    const precep_id_1 = student.assignment.primary_choice.preceptor_id
    const date_assigned_1 = student.assignment.primary_choice.date_assigned

    const clinic_id_2 = student.assignment.secondary_choice.clinic_id
    const precep_id_2 = student.assignment.secondary_choice.preceptor_id
    const date_assigned_2 = student.assignment.secondary_choice.date_assigned

    const clinic_id_3 = student.assignment.tertiary_choice.clinic_id
    const precep_id_3 = student.assignment.tertiary_choice.preceptor_id
    const date_assigned_3 = student.assignment.tertiary_choice.date_assigned

    const getAssignedClinic = (id) => {
        return props.clinic_data.filter(x => x.id == id)[0]
    }

    const getAssignedPreceptor = (id) => {
        return props.preceptor_data.filter(x => x.id == id)[0]
    }

    const removeAssignment = async(clinic_id, preceptor_id, choiceRank) => {
        props.setUpdating(true)
        await removeStudentFromPreceptor(student.id, clinic_id, preceptor_id, choiceRank)
        props.reload()
        props.setUpdating(false)
        return
    }

    return (
        <div className={styles.data}>
            <div className={ styles.goBackBar }>
                <div className={ styles.goBackBtn } onClick={ () => { props.setMatching(null); props.setStudent(null) } } >
                    <IoArrowBack size={20} style={{ marginRight: '1rem' }} />
                    Back to selection
                </div>
            </div>
            <div className={styles.bioTitle}>
                <h4>General Profile Information</h4>
            </div>
            <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
                        <p style={{ marginRight: '1.5rem' }}><strong>Campus:</strong> {student.location_affiliation}</p>
                        <p><strong>County:</strong> {student.county}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>Address:</strong> { `${student.addressLine1}, ${student.addressLine2 == "" ? "" : student.addressLine2 + ', '}${student.city}, ${student.state} ${student.postal}` }</p>
                        <p><strong>Phone Number:</strong> ({student.phoneNumber.substring(0, 3)}) {student.phoneNumber.substring(3, 6)}-{student.phoneNumber.substring(6, 10)}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>UC Email:</strong> {student.affiliated_email ? student.affiliated_email : "Not yet assigned"}</p>
                        <p style={{ marginRight: '1.5rem' }}><strong>US Citizen:</strong> {student.usCitizen}</p>
                        <p><strong>Other Language(s) Spoken:</strong> {student.englishNative}</p>
                    </div>
                    <div className={styles.infoRow}>
                        
                    </div>
                </div>
            </div>
            <div className={ styles.bioTitle }>
            <h4>{student.firstName} {student.lastName}'s Clinical Placement</h4>
            </div>
            <div className={ styles.choice }>
                <div className={ styles.choiceTitle }>
                    <h4>Primary Choice</h4>
                    {clinic_id_1 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_1, precep_id_1, "Primary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_1 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_1).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_1 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_1).firstname} ${getAssignedPreceptor(precep_id_1).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_1 == "" ? 'Unknown' : date_assigned_1 }</p>
            </div>
            <div className={ styles.choice }>
                <div className={ styles.choiceTitle }>
                    <h4>Secondary Choice</h4>
                    {clinic_id_2 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_2, precep_id_2, "Secondary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_2 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_2).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_2 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_2 == "" ? 'Unknown' : date_assigned_2 }</p>
            </div>
            <div className={ styles.choice } style={{ marginBottom: '2rem' }}>
                <div className={ styles.choiceTitle }>
                    <h4>Tertiary Choice</h4>
                    {clinic_id_3 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_3, precep_id_3, "Tertiary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_3 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_3).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_3 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_3 == "" ? 'Unknown' : date_assigned_3 }</p>
            </div>
        </div>
    )
}