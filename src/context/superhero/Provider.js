import { useCallback, useState } from "react";
import axios from "axios";
import SuperHeroContext from "./index";
import Swal from "sweetalert2";


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
            // setResults([]);

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
                    console.log('REPETIDO');
                    return true;
                } else {
                    console.log('TODO BIEN');
                    return false;
                }
            })
            const result = res.includes(true);

            return result;
        }
        if (isRepeated()) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'The Hero is already on your team!'
            })
            return;
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Added successfully!'
            })

            return setMyHeroes([...myHeroes, newHero])
        }
    }

    const handleDelete = (heroID) => {

        const filteredHeroes = myHeroes.filter(hero => {
            return hero.id !== heroID;
        })

        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            showDenyButton: true,
            confirmButtonText: `No`,
            denyButtonText: `Yes`,
        }).then((result) => {
            if (result.isDenied) {
                setMyHeroes(filteredHeroes)
                Swal.fire('Deleted', '', 'success')
            } else if (result.isConfirmed) {
                return;
            }
        })
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