/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    seconds = 1000;

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, seconds);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
	let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
	let sortSth = function(vrb){
		return function (a, b) {
			if (a[vrb] > b[vrb]) {
				return 1;
			}
			if (a[vrb] < b[vrb]) {
				return -1;
			}
			return 0;
		}
	};

	return new Promise(function(resolve, reject) {
		let myRequest = new XMLHttpRequest();
		myRequest.open('get', url);
		myRequest.send();
		myRequest.addEventListener('progress', function () {
			if (myRequest.status === 200) {
				let res = JSON.parse(myRequest.response);
				resolve(res.sort(sortSth('name')));
			}else {
				reject();
			}
		})
	})
}

export {
    delayPromise,
    loadAndSortTowns
};
