const Vendor = ({ setVendor,setSelectedServices,setServiceList ,awsServiceList, gcpServiceList , azureServiceList}) => {
    const handleVendor = (e) => {
        const selectedVendor = e.target.value
        setVendor(selectedVendor)
        setSelectedServices([]);
        if(selectedVendor === 'gcp'){
            setServiceList(gcpServiceList);
        }else if(selectedVendor === 'azure'){
            setServiceList(azureServiceList);
        }
        else{
            setServiceList(awsServiceList);
        }
    }
  return (
    <form className='vendor mx-auto py-3'>
        <label htmlFor="vendor" className='form-label fs-4'>Choose the cloud service provider</label>
        <select className='form-control' name="vendor" id="vendor" defaultValue="aws" onChange={handleVendor}>
            <option value="aws">Amazon Web Services (AWS)</option>
            <option value="gcp">Google Cloud Platform (GCP)</option>
            <option value="azure">Microsoft Azure</option>
        </select>
    </form>
  )
}

export default Vendor