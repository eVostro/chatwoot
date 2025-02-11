require 'rails_helper'

describe op2Hub do
  it 'get latest version from bnk2 hub' do
    version = '1.1.1'
    allow(RestClient).to receive(:get).and_return({ version: version }.to_json)
    expect(described_class.latest_version).to eq version
    expect(RestClient).to have_received(:get).with(described_class::BASE_URL, { params: described_class.instance_config })
  end

  it 'returns nil when bnk2 hub is down' do
    allow(RestClient).to receive(:get).and_raise(ExceptionList::REST_CLIENT_EXCEPTIONS.sample)
    expect(described_class.latest_version).to eq nil
  end
end
