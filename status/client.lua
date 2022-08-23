ESX = nil
PlayerData = {}
local Keys = {
	["G"] = 47
}

CreateThread(function()
    while ESX == nil do
		local sleep = 5
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Wait(sleep)
	end
end)

local PlayerInfoLoaded = false
local wmug, hmug, xmug, ymug = 0.0, 0.0, 0.0, 0.0
local mugshot, mugTxd = nil, nil
local timer = 0
local isPaused, ToggleHUD = true, true
local HUD = false
local IsNUIReady = false

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	PlayerData = xPlayer
	TriggerEvent("gangs:UpdateHudIcon")
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
	PlayerData.job = job
	SetJob({job = PlayerData.job})
end)

RegisterNetEvent('esx:setGang')
AddEventHandler('esx:setGang', function(gang)
	PlayerData.gang = gang
	SetGang({gang = PlayerData.gang})
end)

RegisterNetEvent('status:updatePing')
AddEventHandler('status:updatePing', function(ping)
	SendNUIMessage({action = "ping", value = ping})
end)

RegisterNetEvent('gangs:UpdateHudIcon')
AddEventHandler('gangs:UpdateHudIcon', function(source)
ESX.TriggerServerCallback('ReloadData', function(Info) 
local gang = Info.gang
	if gang.name ~= 'nogang' then
		local icon
		ESX.TriggerServerCallback('gangs:getGangData', function(data)
			logo  = data.logo
			SendNUIMessage({action = "setGangIcon", icon = data.logo})
		end, gang.name)
		end
	end)
end)

function SetDisplay(opacity)
	SendNUIMessage({action  = 'setHUDDisplay', opacity = opacity})
end

function SetName(name)
	SendNUIMessage({action = 'setHUDName', name = name})
end

function SetID(data)
	SendNUIMessage({action = 'setHUDID', source = data})
end

function SetJob(data)
	SendNUIMessage({action  = 'setHUDJob', job = data})
end

function SetGang(data)
	SendNUIMessage({action  = 'setHUDGang', value = 'show', gang = data})
end

function SetPing(ping)
	SendNUIMessage({action = 'setHUDPing', ping = ping})
end

function SetData(data)
	SendNUIMessage({action = 'setHUDData', data = data})
end

function SetStatus(data)
	SendNUIMessage({action  = 'setHUDStatus', data = data})
end

RegisterCommand('reload', function()
	local playerPed  = PlayerPedId()
	local prevHealth = (GetEntityHealth(playerPed)-100)
	local armor = GetPedArmour(playerPed)
	ESX.TriggerServerCallback('ReloadData', function(Info) 
		SetName((Info.name):gsub('_', ' '))
		SetData({health = prevHealth, armor = armor})
		SetID(tostring(GetPlayerServerId(PlayerId())))
		SetJob({job = Info.job})
		SetGang({gang = Info.gang})
		SendNUIMessage({action = "setHUDCash", money = ESX.Math.GroupDigits(Info.money)})
		SendNUIMessage({action = "bitcoin", level = tonumber(Info.bitcoin)})
		local gang = Info.gang
	if gang.name ~= 'nogang' then
		local icon
		ESX.TriggerServerCallback('gangs:getGangData', function(data)
			logo  = data.logo
			SendNUIMessage({action = "setGangIcon", icon = data.logo})
		end, gang.name)
		end
		ESX.TriggerServerCallback("GetLevel", function(Amount)
            SendNUIMessage({action = "bitcoin", level = Amount, respect = 0})
        end)
	end)
end)

Citizen.CreateThread(function()
	local sleep = 30000
    while true do
        Citizen.Wait(sleep)
        ESX.TriggerServerCallback("GetLevel", function(Amount)
            SendNUIMessage({action = "bitcoin", level = Amount, respect = 0})
        end)
    end
end)

AddEventHandler("onKeyDown", function(key)
	if key == "g" then
		
		TogglerHud()
	end
end)

function TogglerHud()
if GetGameTimer() - 2000  > timer then
timer = GetGameTimer()
	ToggleHUD = not ToggleHUD
	HUD = not HUD
	SendNUIMessage({action = 'toggle'})
	ExecuteCommand("reload")
	exports.pNotify:SendNotification({text = '<strong class="whit-text">Taqir Vaziat Anjam Shod</strong>', type = "success", timeout = 1000, layout = "centerRight", queue = "TogglerHud"})
	else
		ESX.ShowNotification("~w~Lotfan Dokme ~w~[~y~G~w~] Ra Spam Nakonid")
		timer = GetGameTimer()
	end
end


CreateThread(function()
	local sleep = 100
    while not PlayerData.name or not IsPedheadshotValid(mugshot) do
        Wait(sleep)
    end
	
	local GetPed = GetPlayerPed(-1)
	mugshot, mugTxd = ESX.Game.GetPedMugshot(GetPed)
	sleep = 5
    while true do
		Wait(sleep)
		if ToggleHUD then
			DrawSprite(mugTxd, mugTxd, xmug, ymug, wmug, hmug, 0.0, 255, 255, 255, 255);
		end
    end
end)

RegisterNetEvent('esx_customui:updateStatus')
AddEventHandler('esx_customui:updateStatus', function(status)
	local ped = GetPlayerPed(-1)
	local prevHealth = (GetEntityHealth(ped)-100)
	local armor = GetPedArmour(ped)
	SetStatus(status)
	SetData({health = prevHealth, armor = armor})
end)

RegisterNetEvent('moneyUpdate')
AddEventHandler('moneyUpdate', function(money)
  	SendNUIMessage({action = "setHUDCash", money = ESX.Math.GroupDigits(money)})
end)

RegisterNetEvent('bcUpdate')
AddEventHandler('bcUpdate', function(bitcoin)
	SendNUIMessage({action = "bitcoin", level = bitcoin})
end)

RegisterNUICallback('NUIReady', function(data, cb)
	IsNUIReady = true
end)

CreateThread(function()
	local playerPed  = PlayerPedId()
	local ped = GetPlayerPed(-1)
	local prevHealth = (GetEntityHealth(ped)-100)
	local armor = GetPedArmour(ped)
	local sleep = 300
	while not PlayerData.name do
		Wait(sleep)
	end
	sleep = 1000
	while true do
		Wait(sleep)
		SetData({health = prevHealth, armor = armor})
	end
end)

CreateThread(function()
	local sleep = 300
	while true do
		Wait(sleep)
		if IsPauseMenuActive() and not isPaused and ToggleHUD then
			isPaused = true
			SetDisplay(0.0)
		elseif not IsPauseMenuActive() and isPaused and ToggleHUD then
			isPaused = false
			SetDisplay(1.0)
		end
	end
end)

AddEventHandler('skinchanger:modelLoaded', function()
	local pedid = PlayerPedId()
	local GetPed = GetPlayerPed(-1)
	local ID = PlayerId()
	local Finish = HasPedHeadBlendFinished
	local sleep = 100
	while not PlayerData.name do
		Wait(sleep)
	end
	
	sleep = 10
	while not Finish(pedid) do
		Wait(sleep)
	end
	if not PlayerInfoLoaded then
		SetName((PlayerData.name):gsub('_', ' '))
		SetID(tostring(GetPlayerServerId(ID)))
		SetJob({job = PlayerData.job})
		SetGang({gang = PlayerData.gang})
		SendNUIMessage({action = "setHUDCash", money = ESX.Math.GroupDigits(PlayerData.money)})
		PlayerInfoLoaded = true
	end
	
	mugshot, mugTxd = ESX.Game.GetPedMugshot(GetPed)
	
	local gang = PlayerData.gang
	if gang.name ~= 'nogang' then
		local icon
		ESX.TriggerServerCallback('gangs:getGangData', function(data)
			logo  = data.logo
			SendNUIMessage({action = "setGangIcon", icon = data.logo})
		end, gang.name)
		end
		ESX.TriggerServerCallback("GetLevel", function(Amount, tedad)
        SendNUIMessage({action = "bitcoin", level = Amount, respect = tedad})
    end)
end)

RegisterNUICallback('setMugShotPos', function(data)
	wmug = data.w
	hmug = data.h
	xmug = data.x + (data.w/2)
	ymug = data.y + (data.h/2)
end)

AddEventHandler('onResourceStop', function(resource)
	if resource == GetCurrentResourceName() then
		for i=1, 35 do
			UnregisterPedheadshot(i)
		end
	end
end)

AddEventHandler('onResourceStart', function(resource)
	if resource == GetCurrentResourceName() then
		local sleep = 2000
		Wait(sleep)
		ExecuteCommand("reload")
	end
end)