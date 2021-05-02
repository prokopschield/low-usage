declare class Low_Usage {
    get cpu(): Promise<void>;
    get mem(): Promise<void>;
    get ram(): Promise<void>;
}
declare const low_usage: Low_Usage;
export default low_usage;
