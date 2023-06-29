
import RecipeTabs from "../Components/RecipeTabs";
import MainLayout from '../Layouts/MainLayout';

export default function Home () {

    return (
        <MainLayout>
        <div className='home-page'>
           

            <RecipeTabs/>

        </div>
        </MainLayout>
    )
}