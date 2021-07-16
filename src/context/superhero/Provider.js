import { useCallback, useState } from "react";
import axios from "axios";
import SuperHeroContext from "./index";
import AlertService from '../../components/alertService/AlertService'


const apiCall = axios.create({
    baseURL: `https://superheroapi.com/api.php/1977478539095105`,
});

export default function SuperHeroProvider({ children }) {
    const [isSearching, setIsSearching] = useState();
    const [results, setResults] = useState();
    const [error, setError] = useState();
    const [biography, setBiography] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [bioPhoto, setBioPhoto] = useState();
    const [myHeroes, setMyHeroes] = useState([]);

    const searchSuperHero = async (searchText) => {
        try {
            setIsSearching(true);
            setError();

            const { data } = await apiCall.get(`/search/${searchText}`);

            setResults(data?.results || []);
        } catch (error) {
            setError("Algo ha ocurrido");
        } finally {
            setIsSearching(false);
        }
    };

    const fetchSuperHeroBio = useCallback(async (id) => {
        try {
            setError();
            setBioPhoto();
            setBiography({});
            setIsFetching(true);

            const bio = await apiCall.get(`/${id}/biography`);
            const bioPhoto = await apiCall.get(`/${id}/image`);
            const bioWork = await apiCall.get(`/${id}/work`);
            const appearance = await apiCall.get(`/${id}/appearance`);

            setBiography({ bio: bio.data, bioWork: bioWork.data, appearance: appearance.data });
            setBioPhoto(bioPhoto?.data?.url);
        } catch (error) {
            setError("Algo ha pasado en las llamadas");
            setBiography({});
            setBioPhoto();
        } finally {
            setIsFetching(false);
        }
    }, [setIsFetching, setBioPhoto, setBiography]);

    const handleAdd = (heroId) => {
        const newHero = results.find(hero => {
            return hero.id === heroId
        })
        console.log(newHero)

        const isRepeated = () => {
            const res = myHeroes.map(hero => {
                if (hero.id === newHero.id) {
                    return true;
                } else {
                    return false;
                }
            })
            const result = res.includes(true);

            return result;
        }
        if (isRepeated()) {
            AlertService.tempNotify('The Hero is already on your team!', true)
            return;
        } else {
            AlertService.tempNotify('Added successfully! ')
            return setMyHeroes([...myHeroes, newHero])
        }
    }

    const handleDelete = async (heroID) => {

        const filteredHeroes = myHeroes.filter(hero => {
            return hero.id !== heroID;
        })

        const result = await AlertService.confirm('Delete','Are you sure?')
        if (result) {
            setMyHeroes(filteredHeroes)
            AlertService.success('Deleted successfully')
        }
    }


    return (
        <SuperHeroContext.Provider value={{
            searchSuperHero,
            fetchSuperHeroBio,
            isFetching,
            setIsFetching,
            bioPhoto,
            biography,
            results,
            error,
            isSearching,
            myHeroes,
            handleAdd,
            handleDelete
        }}>
            {children}
        </SuperHeroContext.Provider>
    );
}