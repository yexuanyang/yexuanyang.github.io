const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // 需要在 .env.local 中设置

export async function getWeather(lat, lon) {
    try {
        console.log('Starting weather fetch with coordinates:', { lat, lon });
        
        // 确保经纬度格式正确（高德地图要求：经度在前，纬度在后）
        const formattedLocation = `${lon.toFixed(6)},${lat.toFixed(6)}`;
        console.log('Formatted location:', formattedLocation);
        
        // 使用高德地图 API 获取城市信息
        const locationUrl = `https://restapi.amap.com/v3/geocode/regeo?key=${API_KEY}&location=${formattedLocation}&extensions=base`;
        console.log('Location API URL:', locationUrl);
        
        const locationResponse = await fetch(locationUrl);
        const locationData = await locationResponse.json();
        console.log('Location API response:', locationData);
        
        if (locationData.status !== '1') {
            console.error('Location API error:', locationData);
            throw new Error(`地理编码请求失败: ${locationData.info || '未知错误'}`);
        }

        if (!locationData.regeocode || !locationData.regeocode.addressComponent) {
            console.error('Invalid location data structure:', locationData);
            throw new Error('无法解析地理位置信息');
        }

        // 处理城市名称
        let cityName = '';
        const addressComponent = locationData.regeocode.addressComponent;
        
        if (addressComponent.city && addressComponent.city.length > 0) {
            cityName = addressComponent.city;
        } else if (addressComponent.province && addressComponent.province.length > 0) {
            cityName = addressComponent.province;
        } else if (addressComponent.district && addressComponent.district.length > 0) {
            cityName = addressComponent.district;
        } else {
            cityName = '未知城市';
        }

        // 移除"市"、"省"、"自治区"等后缀
        cityName = cityName.replace(/市|省|自治区|特别行政区|维吾尔|壮族|回族|特区/g, '');
        
        const adcode = addressComponent.adcode;
        console.log('City and adcode:', { cityName, adcode });

        // 使用城市编码获取天气信息
        const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=${API_KEY}&city=${adcode}&extensions=base`;
        console.log('Weather API URL:', weatherUrl);
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        console.log('Weather API response:', weatherData);
        
        if (weatherData.status !== '1') {
            console.error('Weather API error:', weatherData);
            throw new Error(`天气数据请求失败: ${weatherData.info || '未知错误'}`);
        }

        if (!weatherData.lives || weatherData.lives.length === 0) {
            console.error('No weather data available:', weatherData);
            throw new Error('没有可用的天气数据');
        }

        const weather = weatherData.lives[0];
        const result = {
            city: cityName,
            temperature: weather.temperature,
            description: weather.weather,
            windDirection: weather.winddirection,
            windPower: weather.windpower,
            humidity: weather.humidity
        };
        
        console.log('Final weather result:', result);
        return result;

    } catch (error) {
        console.error('Weather API error:', error);
        // 返回更具体的错误信息
        throw new Error(error.message || '获取天气信息失败，请稍后再试');
    }
} 