import firebase from 'firebase/app'
// import * as Storage from '@google-cloud/storage'

const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET

export default class storageModel {
    
    filenamePath: string
    file: any
    frStorage: firebase.storage.Storage = firebase.storage()

    constructor (filenamePath: string, file: any) {
        this.filenamePath = filenamePath
        this.file = file
    }

    async upload () {
        try {
            let path = this.filenamePath
            let mountainsRef = this.frStorage.ref().child(path)
            await mountainsRef.put(this.file)
            let url = await mountainsRef.getDownloadURL()
            console.log('storage upload', url)
            return url
        } catch (error) {
            throw error
        }
    }

    async download () {
        try {
            let path = this.filenamePath
            let pathRef = this.frStorage.ref()
            let result = await pathRef.child(path).getDownloadURL()
            return result
        } catch (error) {
            throw error
        }
    }
    /*
    async upload (): Promise<any> {
        let result: any
        try {
            let path = this.filenamePath
            let storageRef = firebase.storage().ref()
            let mountainsRef = storageRef.child(path)
            result = await mountainsRef.put(this.file)
            console.log('updateFile', result)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    async download (): Promise<any> {
        let result: any
        try {
            let path = this.filenamePath
            let storage = firebase.storage()
            let pathRef = storage.ref()
            result = await pathRef.child(path).getDownloadURL()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }
    */
    /*
    public async delete (): Promise<any> {
        let result: any
        try {
            let path = this.filenamePath
            const storage = Storage()
            result = await storage.bucket(BUCKET_NAME).file(path).delete()
            this.file = undefined
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }
    */

}